require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Lead = require('./models/Lead');
const {
  buildOllamaPrompt,
  normalizeLocale,
  sanitizeHistory,
} = require('../shared/chatPrompt');

const app = express();
const PORT = Number(process.env.PORT || 3010);
const HOST = process.env.HOST || '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zeus_protocol';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'mistral';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

function parseAllowedOrigins(value) {
  if (!value || value === '*') {
    return true;
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

const FALLBACK_RESPONSE = [
  'No momento o ZEUS AI local nao respondeu, mas a Zeus Protocol pode te ajudar com sistemas, automacoes e infraestrutura.',
  'Se quiser, me diga nome, projeto, prazo e um contato para eu registrar um lead qualificado.',
].join(' ');
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

  if (/(quero orcamento|quero orçamento|preciso de orcamento|preciso de orçamento|tenho um projeto|quiero presupuesto|necesito presupuesto|tengo un proyecto)/i.test(content)) {
    return 'quote';
  }

  if (/(orcamento|orçamento|preco|preço|valor|quanto custa|investimento|presupuesto|precio|cuanto cuesta|inversion)/i.test(content)) {
    return 'pricing';
  }

  if (/(contratar|fechar projeto|quero voces|quero vocês|proposta|vamos conversar|vamos fechar|contratar|cerrar proyecto|propuesta|vamos hablar|vamos a cerrar)/i.test(content)) {
    return 'hire';
  }

  if (/(site|landing page|e-commerce|portfolio|portfólio|sitio|pagina|portafolio)/i.test(content)) {
    return 'website';
  }

  if (/(automacao|automação|bot|integra[cç][aã]o|workflow|crm|automatizacion|bot|integracion|flujo)/i.test(content)) {
    return 'automation';
  }

  if (/(devops|infra|infraestrutura|docker|deploy|cloud|servidor|monitoramento|ci\/cd|despliegue|nube|monitoreo)/i.test(content)) {
    return 'devops';
  }

  return 'general';
}

function getFallbackResponse(locale) {
  const normalized = normalizeLocale(locale);

  if (normalized === 'en-US') {
    return [
      'ZEUS AI local is offline right now, but Zeus Protocol can help with systems, automation and infrastructure.',
      'If you want, send name, project, deadline and contact so I can register a qualified lead.',
    ].join(' ');
  }

  if (normalized === 'es-ES') {
    return [
      'ZEUS AI local no esta disponible ahora mismo, pero Zeus Protocol puede ayudarte con sistemas, automatizacion e infraestructura.',
      'Si quieres, envía nombre, proyecto, plazo y contacto para registrar un lead cualificado.',
    ].join(' ');
  }

  return FALLBACK_RESPONSE;
}

function shouldSaveLead(email, phone, intention) {
  return Boolean(email) || Boolean(phone) || ['quote', 'hire', 'pricing'].includes(intention);
}

async function connectMongo() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

async function saveLeadIfNeeded({ message, email, phone, intention }) {
  if (!shouldSaveLead(email, phone, intention) || mongoose.connection.readyState !== 1) {
    return false;
  }

  try {
    await Lead.create({
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

async function generateWithOllama(message, history = [], locale) {
  const prompt = buildOllamaPrompt(message, history, locale);

  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      options: {
        temperature: 0.6,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama HTTP ${response.status}`);
  }

  const data = await response.json();
  return (data.response || '').trim();
}

app.use(cors({ origin: parseAllowedOrigins(CORS_ORIGIN) }));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    model: OLLAMA_MODEL,
  });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'frontend.html'));
});

app.post('/chat', async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  const history = sanitizeHistory(req.body?.history);
  const locale = normalizeLocale(req.body?.locale);
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

  let reply = getFallbackResponse(locale);
  let aiAvailable = false;

  try {
    const aiReply = await generateWithOllama(message, history, locale);
    if (aiReply) {
      reply = aiReply;
      aiAvailable = true;
    }
  } catch (error) {
    console.error('Ollama request failed:', error.message);
  }

  const leadSaved = await saveLeadIfNeeded({ message, email, phone, intention });

  return res.json({
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
});

app.use((error, req, res, _next) => {
  console.error('Unexpected server error:', error);
  res.status(500).json({
    ok: false,
    error: 'Erro interno no servidor.',
    reply: getFallbackResponse(req.body?.locale),
  });
});

connectMongo().finally(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Zeus Protocol AI chat running on http://${HOST}:${PORT}`);
  });
});
