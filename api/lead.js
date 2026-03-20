const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || '';
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

let cachedConnection = null;
let LeadModel = null;
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

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : extractEmail(message);
  const phone = typeof req.body?.phone === 'string' ? req.body.phone.trim() : extractPhone(message);
  const intention = typeof req.body?.intention === 'string' ? req.body.intention : 'general';
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

  if (!shouldSaveLead(email, phone, intention)) {
    return res.status(200).json({
      ok: true,
      saved: false,
    });
  }

  try {
    await connectMongo();
    if (!LeadModel) {
      return res.status(200).json({
        ok: true,
        saved: false,
      });
    }

    await LeadModel.create({
      message,
      email: email || null,
      phone: phone || null,
      intention,
    });

    return res.status(200).json({
      ok: true,
      saved: true,
    });
  } catch (error) {
    console.error('Lead save failed:', error.message);
    return res.status(500).json({
      ok: false,
      error: 'Lead save failed.',
    });
  }
};
