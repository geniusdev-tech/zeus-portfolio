// @ts-nocheck
export function getAllowedOrigin(req: Request): string {
  const configured = (Deno.env.get('ALLOWED_ORIGIN') || '').trim();
  const defaults = [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000',
    'http://localhost:54321',
    'https://zeusprotocol.cloud',
    'https://www.zeusprotocol.cloud',
  ];
  const allowedOrigins = (configured ? configured.split(',') : defaults)
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (allowedOrigins.includes('*')) {
    return '*';
  }

  const requestOrigin = req.headers.get('origin');
  if (!requestOrigin) {
    return allowedOrigins[0];
  }

  return allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0];
}

export function corsHeaders(req: Request, methods = 'GET, POST, OPTIONS'): Headers {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', getAllowedOrigin(req));
  headers.set('Access-Control-Allow-Methods', methods);
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  headers.set('Vary', 'Origin');
  return headers;
}

export function jsonResponse(req: Request, status: number, payload: unknown): Response {
  const headers = corsHeaders(req);
  headers.set('Content-Type', 'application/json');
  return new Response(JSON.stringify(payload), { status, headers });
}

export function handleOptions(req: Request, methods = 'GET, POST, OPTIONS'): Response | null {
  if (req.method !== 'OPTIONS') {
    return null;
  }

  return new Response(null, { status: 200, headers: corsHeaders(req, methods) });
}

export function extractEmail(text: string): string | null {
  const match = String(text || '').match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].toLowerCase() : null;
}

export function extractPhone(text: string): string | null {
  const normalized = String(text || '').replace(/[^\d+]/g, ' ');
  const match = normalized.match(/(?:\+?\d[\d ]{7,}\d)/);
  if (!match) {
    return null;
  }

  const digits = match[0].replace(/[^\d+]/g, '');
  const numbersOnly = digits.replace(/\D/g, '');
  return numbersOnly.length >= 8 ? digits : null;
}
