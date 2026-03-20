const mongoose = require('mongoose');
const {
  buildAIMLMessages,
  sanitizeHistory,
} = require('../shared/chatPrompt');

const MONGODB_URI = process.env.MONGODB_URI || '';
const AIMLAPI_API_KEY = process.env.AIMLAPI_API_KEY || process.env.GEMINI_API_KEY || '';
const AIMLAPI_MODEL = process.env.AIMLAPI_MODEL || 'google/gemma-3-4b-it';

const FALLBACK_RESPONSE = [
  'No momento o ZEUS AI nao respondeu, mas a Zeus Protocol pode te ajudar com sistemas, automacoes e infraestrutura.',
  'Se quiser, envie nome, projeto, prazo e contato para registrarmos seu lead e seguir com direcionamento.',
].join(' ');

let cachedConnection = null;
let LeadModel = null;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const rateLimitStore = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

function extractEmail(text) {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].toLowerCase() : null;
}

function extractPhone(text) {
  const normalized = text.replace(/[^\d+]/g, ' ');
  const match = normalized.match(/(?:\+?\d[\d ]{7,}\d)/);
  if (!match) {
    return null;
  }

  const digits = match[0].replace(/[^\d+]/g, '');
  const numbersOnly = digits.replace(/\D/g, '');
  return numbersOnly.length >= 8 ? digits : null;
}

function detectIntention(text) {
  const content = text.toLowerCase();

  if (/(quero orcamento|quero orçamento|preciso de orcamento|preciso de orçamento|tenho um projeto)/i.test(content)) {
    return 'quote';
  }

  if (/(orcamento|orçamento|preco|preço|valor|quanto custa|investimento)/i.test(content)) {
    return 'pricing';
  }

  if (/(contratar|fechar projeto|quero voces|quero vocês|proposta|vamos conversar|vamos fechar)/i.test(content)) {
    return 'hire';
  }

  if (/(site|landing page|e-commerce|portfolio|portfólio)/i.test(content)) {
    return 'website';
  }

  if (/(automacao|automação|bot|integra[cç][aã]o|workflow|crm)/i.test(content)) {
    return 'automation';
  }

  if (/(devops|infra|infraestrutura|docker|deploy|cloud|servidor|monitoramento|ci\/cd)/i.test(content)) {
    return 'devops';
  }

  return 'general';
}

function shouldSaveLead(email, phone, intention) {
  return Boolean(email) || Boolean(phone) || ['quote', 'hire', 'pricing'].includes(intention);
}

async function connectMongo() {
  if (!MONGODB_URI) {
    return null;
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  cachedConnection = await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  if (!LeadModel) {
    const LeadSchema = new mongoose.Schema(
      {
        message: {
          type: String,
          required: true,
          trim: true,
          maxlength: 5000,
        },
        email: {
          type: String,
          trim: true,
          lowercase: true,
          default: null,
        },
        phone: {
          type: String,
          trim: true,
          default: null,
        },
        intention: {
          type: String,
          required: true,
          enum: ['quote', 'hire', 'pricing', 'automation', 'devops', 'website', 'general'],
          default: 'general',
        },
      },
      {
        timestamps: { createdAt: true, updatedAt: false },
      }
    );

    LeadModel = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
  }

  return cachedConnection;
}

async function saveLeadIfNeeded({ message, email, phone, intention }) {
  if (!shouldSaveLead(email, phone, intention)) {
    return false;
  }

  try {
    await connectMongo();
    if (!LeadModel) {
      return false;
    }

    await LeadModel.create({
      message,
      email,
      phone,
      intention,
    });

    return true;
  } catch (error) {
    console.error('Lead save failed:', error.message);
    return false;
  }
}

async function generateWithAimlApi(message, history = []) {
  if (!AIMLAPI_API_KEY) {
    throw new Error('AIMLAPI_API_KEY not configured');
  }

  const endpoint = 'https://api.aimlapi.com/v1/chat/completions';
  const messages = buildAIMLMessages(message, history);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AIMLAPI_API_KEY}`,
    },
    body: JSON.stringify({
      model: AIMLAPI_MODEL,
      messages,
      temperature: 0.6,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AIMLAPI HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return (data.choices?.[0]?.message?.content || '').trim();
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed.',
    });
  }

  const rawMessage = typeof req.body?.message === 'string' ? req.body.message : '';
  const message = rawMessage.trim();
  const history = sanitizeHistory(req.body?.history);
  const clientIp = getClientIp(req);

  if (!message) {
    return res.status(400).json({
      ok: false,
      error: 'Mensagem obrigatoria.',
    });
  }

  if (message.length > 5000) {
    return res.status(400).json({
      ok: false,
      error: 'Mensagem muito longa.',
    });
  }

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      ok: false,
      error: 'Muitas mensagens em pouco tempo. Tente novamente em instantes.',
    });
  }

  const email = extractEmail(message);
  const phone = extractPhone(message);
  const intention = detectIntention(message);

  let reply = FALLBACK_RESPONSE;
  let aiAvailable = false;

  try {
    const aiReply = await generateWithAimlApi(message, history);
    if (aiReply) {
      reply = aiReply;
      aiAvailable = true;
    }
  } catch (error) {
    console.error('AIMLAPI request failed:', error.message);
  }

  const leadSaved = await saveLeadIfNeeded({ message, email, phone, intention });

  return res.status(200).json({
    ok: true,
    reply,
    meta: {
      email,
      phone,
      intention,
      aiAvailable,
      leadSaved,
    },
  });
};
