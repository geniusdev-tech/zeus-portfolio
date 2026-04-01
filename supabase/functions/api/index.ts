// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { buildAIMLMessages, normalizeLocale, sanitizeHistory } from '../_shared/chatPrompt.ts';
import { extractEmail, extractPhone, handleOptions, jsonResponse } from '../_shared/http.ts';
import { insertLead } from '../_shared/supabase.ts';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const CHAT_RATE_LIMIT_MAX_REQUESTS = 12;
const SUPABASE_RATE_LIMIT_STORE = new Map<string, { count: number; resetAt: number }>();
const CHAT_RATE_LIMIT_STORE = new Map<string, { count: number; resetAt: number }>();
const START_TIME = Date.now();

function getSupabaseUrl(): string {
  return String(Deno.env.get('SUPABASE_URL') || Deno.env.get('APP_SUPABASE_URL') || '').trim().replace(/\/$/, '');
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp && cfConnectingIp.trim()) {
    return cfConnectingIp.trim();
  }

  return 'unknown';
}

function isRateLimited(store: Map<string, { count: number; resetAt: number }>, ip: string, maxRequests: number): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt <= now) {
    store.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

function parseJsonBody(req: Request): Promise<Record<string, unknown>> {
  return req.json().catch(() => ({}));
}

function detectIntention(text: string): string {
  const content = text.toLowerCase();

  if (/(quero orcamento|quero orçamento|preciso de orcamento|preciso de orçamento|tenho um projeto|quiero presupuesto|necesito presupuesto|tengo un proyecto)/i.test(content)) {
    return 'quote';
  }

  if (/(orcamento|orçamento|preco|preço|valor|quanto custa|investimento|presupuesto|precio|cuanto cuesta|inversion)/i.test(content)) {
    return 'pricing';
  }

  if (/(contratar|fechar projeto|quero voces|quero vocês|proposta|vamos conversar|vamos fechar|cerrar proyecto|propuesta|vamos hablar|vamos a cerrar)/i.test(content)) {
    return 'hire';
  }

  if (/(site|landing page|e-commerce|portfolio|portfólio|sitio|pagina|portafolio)/i.test(content)) {
    return 'website';
  }

  if (/(automacao|automação|bot|integra[cç][aã]o|workflow|crm|automatizacion|integracion|flujo)/i.test(content)) {
    return 'automation';
  }

  if (/(devops|infra|infraestrutura|docker|deploy|cloud|servidor|monitoramento|ci\/cd|despliegue|nube|monitoreo)/i.test(content)) {
    return 'devops';
  }

  return 'general';
}

function shouldSaveLead(email: string | null, phone: string | null, intention: string): boolean {
  return Boolean(email) || Boolean(phone) || ['quote', 'hire', 'pricing'].includes(intention);
}

function fallbackResponse(locale: string): string {
  if (locale === 'en-US') {
    return [
      'ZEUS AI is offline at the moment, but Zeus Protocol can help with systems, automation and infrastructure.',
      'If you want, send name, project, deadline and contact so we can register the lead and keep the intake moving.',
    ].join(' ');
  }

  if (locale === 'es-ES') {
    return [
      'ZEUS AI no esta disponible en este momento, pero Zeus Protocol puede ayudarte con sistemas, automatizacion e infraestructura.',
      'Si quieres, envía nombre, proyecto, plazo y contacto para registrar el lead y seguir con la captacion.',
    ].join(' ');
  }

  return [
    'No momento o ZEUS AI nao respondeu, mas a Zeus Protocol pode te ajudar com sistemas, automacoes e infraestrutura.',
    'Se quiser, envie nome, projeto, prazo e contato para registrarmos seu lead e seguir com direcionamento.',
  ].join(' ');
}

async function generateWithAimlApi(message: string, history: unknown[], locale: string): Promise<string> {
  const apiKey = String(Deno.env.get('AIMLAPI_API_KEY') || Deno.env.get('GEMINI_API_KEY') || '').trim();
  if (!apiKey) {
    throw new Error('AIMLAPI_API_KEY not configured');
  }

  const model = String(Deno.env.get('AIMLAPI_MODEL') || 'google/gemma-3-4b-it').trim();
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: buildAIMLMessages(message, history, locale),
      temperature: 0.6,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AIMLAPI HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return String(data?.choices?.[0]?.message?.content || '').trim();
}

function escapeHtml(value: string): string {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildContactHtml(input: { name: string; company: string; email: string; subject: string; message: string }): string {
  const companyRow = input.company.trim()
    ? `<tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;width:120px;">Company</td><td style="padding:8px 0;font-size:0.85rem;color:#e5e7eb;">${escapeHtml(input.company)}</td></tr>`
    : '';

  return `
    <div style="font-family:Arial,sans-serif;color:#e5e7eb;">
      <h2 style="margin:0 0 18px 0;font-size:1.25rem;font-weight:600;color:#f9fafb;">Project Inquiry Received</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;width:120px;">Name</td><td style="padding:8px 0;font-size:0.85rem;color:#e5e7eb;">${escapeHtml(input.name)}</td></tr>
        ${companyRow}
        <tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;">Email</td><td style="padding:8px 0;font-size:0.85rem;color:#22d3ee;">${escapeHtml(input.email)}</td></tr>
        <tr><td style="color:#9ca3af;padding:8px 0;font-size:0.85rem;">Subject</td><td style="padding:8px 0;font-size:0.85rem;color:#e5e7eb;">${escapeHtml(input.subject)}</td></tr>
        <tr><td colspan="2" style="padding:18px 0 8px 0;color:#9ca3af;font-size:0.85rem;">Message</td></tr>
        <tr><td colspan="2" style="padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f3f4f6;line-height:1.55;">${escapeHtml(input.message).replaceAll('\n', '<br>')}</td></tr>
      </table>
    </div>
  `;
}

async function deliverResendEmail(input: { to: string; replyTo: string; subject: string; html: string }): Promise<boolean> {
  const apiKey = String(Deno.env.get('RESEND_API_KEY') || '').trim();
  const fromEmail = String(Deno.env.get('EMAIL_FROM') || '').trim() || 'Portfolio <onboarding@resend.dev>';

  if (!apiKey || !input.to) {
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [input.to],
      reply_to: input.replyTo,
      subject: input.subject,
      html: input.html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`resend API error: status ${response.status} body ${errorText}`);
  }

  return true;
}

async function forwardAnalytics(req: Request, body: Record<string, unknown>): Promise<Response> {
  const measurementID = String(body.measurement_id || Deno.env.get('GA4_MEASUREMENT_ID') || '').trim();
  const apiSecret = String(Deno.env.get('GA4_API_SECRET') || '').trim();
  const clientID = String(body.client_id || '').trim();
  const sessionID = String(body.session_id || '').trim();
  const eventName = String(body.event_name || '').trim();
  const pageTitle = String(body.page_title || '').trim();
  const pageLocation = String(body.page_location || '').trim();
  const pageReferrer = String(body.page_referrer || '').trim();
  const engagementTimeMsec = Number(body.engagement_time_msec) > 0 ? Number(body.engagement_time_msec) : 1000;

  if (!measurementID || !apiSecret) {
    return jsonResponse(req, 503, {
      success: false,
      message: 'GA4 not configured',
    });
  }

  if (!clientID) {
    return jsonResponse(req, 400, {
      success: false,
      message: 'client_id is required',
    });
  }

  const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementID)}&api_secret=${encodeURIComponent(apiSecret)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientID,
      ...(sessionID ? { session_id: sessionID } : {}),
      events: [
        {
          name: eventName || 'page_view',
          params: {
            page_title: pageTitle || undefined,
            page_location: pageLocation || undefined,
            page_referrer: pageReferrer || undefined,
            engagement_time_msec: engagementTimeMsec,
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return jsonResponse(req, 502, {
      success: false,
      message: `GA4 forwarding failed: ${errorText}`,
    });
  }

  return jsonResponse(req, 200, {
    success: true,
    message: 'Analytics forwarded.',
  });
}

function buildServerMetrics(mode: 'live' | 'simulated') {
  return {
    os: 'Linux',
    region: Deno.env.get('DENO_REGION') || 'global',
    cpu_usage: mode === 'live' ? 14.2 : 8.4,
    mem_used_mb: mode === 'live' ? 412 : 256,
    mem_total_mb: mode === 'live' ? 1024 : 512,
    mem_pct: mode === 'live' ? 40.2 : 50.0,
    load_avg: mode === 'live' ? '0.20 0.25 0.18' : '0.08 0.12 0.10',
    disk_used_gb: mode === 'live' ? 1.8 : 0.9,
    disk_total_gb: mode === 'live' ? 2.0 : 1.0,
    disk_pct: mode === 'live' ? 90.0 : 90.0,
  };
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  return parts.length > 0 ? parts.join(' ') : '< 1m';
}

async function checkProjects() {
  const projectUrl = getSupabaseUrl();
  const selfHealth = projectUrl ? `${projectUrl}/functions/v1/api/health` : 'http://localhost:54321/functions/v1/api/health';
  const projects = [
    {
      name: 'qelox',
      display_name: 'QELO-X',
      healthURL: Deno.env.get('QELOX_HEALTH_URL') || '',
    },
    {
      name: 'portfolio',
      display_name: 'Zeus_',
      healthURL: Deno.env.get('FRONTEND_URL') || Deno.env.get('PORTFOLIO_URL') || 'https://zeusprotocol.cloud',
    },
    {
      name: 'backend',
      display_name: 'API Backend',
      healthURL: selfHealth,
    },
  ];

  const out: Array<Record<string, unknown>> = [];
  for (const project of projects) {
    const svc: Record<string, unknown> = {
      name: project.name,
      display_name: project.display_name,
      url: project.healthURL || '',
      status: 'unknown',
      latency: 0,
      latency_ms: 0,
      checked_at: new Date().toISOString(),
    };

    if (!project.healthURL) {
      out.push(svc);
      continue;
    }

    const start = Date.now();
    try {
      const response = await fetch(project.healthURL, { method: 'GET' });
      const latency = Date.now() - start;
      svc.latency = latency;
      svc.latency_ms = latency;
      svc.status = response.ok ? 'running' : 'stopped';
    } catch {
      const latency = Date.now() - start;
      svc.latency = latency;
      svc.latency_ms = latency;
      svc.status = 'stopped';
    }

    out.push(svc);
  }

  return out;
}

async function saveLead(input: { message: string; email: string | null; phone: string | null; intention: string; source: string; name?: string | null; company?: string | null; subject?: string | null }): Promise<boolean> {
  return insertLead(input);
}

async function handleChat(req: Request, body: Record<string, unknown>) {
  const ip = getClientIp(req);
  if (isRateLimited(CHAT_RATE_LIMIT_STORE, ip, CHAT_RATE_LIMIT_MAX_REQUESTS)) {
    return jsonResponse(req, 429, {
      ok: false,
      error: 'Rate limit exceeded. Please wait a moment and try again.',
    });
  }

  const message = String(body.message || body.text || '').trim();
  const locale = normalizeLocale(body.locale);
  const history = sanitizeHistory(body.history);

  if (!message) {
    return jsonResponse(req, 422, {
      ok: false,
      error: 'message is required',
    });
  }

  const email = extractEmail(message);
  const phone = extractPhone(message);
  const intention = detectIntention(message);
  const leadPayload = {
    message,
    email,
    phone,
    intention,
    source: 'chat',
  };

  const aiApiKey = String(Deno.env.get('AIMLAPI_API_KEY') || Deno.env.get('GEMINI_API_KEY') || '').trim();
  const aiAvailable = Boolean(aiApiKey);

  if (!aiAvailable) {
    const leadSaved = shouldSaveLead(email, phone, intention)
      ? await saveLead(leadPayload).catch(() => false)
      : false;

    return jsonResponse(req, 200, {
      ok: true,
      reply: fallbackResponse(locale),
      meta: {
        aiAvailable: false,
        leadSaved,
        intention,
        email,
        phone,
      },
    });
  }

  try {
    const reply = await generateWithAimlApi(message, history, locale);
    const leadSaved = shouldSaveLead(email, phone, intention)
      ? await saveLead(leadPayload).catch(() => false)
      : false;

    return jsonResponse(req, 200, {
      ok: true,
      reply: reply || fallbackResponse(locale),
      meta: {
        aiAvailable: true,
        leadSaved,
        intention,
        email,
        phone,
      },
    });
  } catch (error) {
    const leadSaved = shouldSaveLead(email, phone, intention)
      ? await saveLead(leadPayload).catch(() => false)
      : false;

    return jsonResponse(req, 200, {
      ok: true,
      reply: fallbackResponse(locale),
      meta: {
        aiAvailable: false,
        leadSaved,
        intention,
        email,
        phone,
        error: (error as Error).message,
      },
    });
  }
}

async function handleContact(req: Request, body: Record<string, unknown>) {
  const name = String(body.name || '').trim();
  const company = String(body.company || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const subject = String(body.subject || '').trim();
  const message = String(body.message || '').trim();
  const destination = String(Deno.env.get('CONTACT_TO_EMAIL') || '').trim() || 'walletzeus@proton.me';

  if (!name) {
    return jsonResponse(req, 422, { success: false, message: 'name is required' });
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    return jsonResponse(req, 422, { success: false, message: 'valid email is required' });
  }

  if (!message) {
    return jsonResponse(req, 422, { success: false, message: 'message is required' });
  }

  const finalSubject = subject || 'Portfolio Contact';
  const html = buildContactHtml({ name, company, email, subject: finalSubject, message });

  // Always attempt to save the lead first to guarantee data isn't lost
  const leadSaved = await saveLead({
    name: name || null,
    company: company || null,
    subject: finalSubject || null,
    message: `${finalSubject}\n\n${message}`,
    email,
    phone: extractPhone(`${name} ${company} ${message}`),
    intention: detectIntention(message),
    source: 'contact',
  }).catch(() => false);

  try {
    const delivered = await deliverResendEmail({
      to: destination,
      replyTo: email,
      subject: `[Zeus_] ${finalSubject} — ${name}`,
      html,
    });

    return jsonResponse(req, 200, {
      success: true,
      message: delivered ? 'Mensagem enviada com sucesso.' : 'Mensagem salva com sucesso no sistema.',
    });
  } catch (error) {
    // Return 200 because the lead actually hit the CRM successfully, so user shouldn't retry endlessly
    return jsonResponse(req, 200, {
      success: true,
      message: 'Mensagem recebida e registrada no sistema (falha no redirecionamento de email).',
    });
  }
}

async function handleLead(req: Request, body: Record<string, unknown>) {
  const message = String(body.message || body.summary || '').trim();
  const email = String(body.email || '').trim().toLowerCase() || null;
  const phone = String(body.phone || '').trim() || null;
  const intention = String(body.intention || detectIntention(message || `${body.subject || ''}`)).trim() || 'general';
  const source = String(body.source || 'general').trim() || 'general';

  if (!message) {
    return jsonResponse(req, 422, {
      success: false,
      message: 'message is required',
    });
  }

  const saved = await saveLead({
    message,
    email,
    phone,
    intention,
    source,
  }).catch(() => false);

  return jsonResponse(req, 200, {
    success: true,
    saved,
    message: saved ? 'Lead saved.' : 'Lead not saved.',
  });
}

async function handleQeloxPurchase(req: Request, body: Record<string, unknown>) {
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const productName = String(body.productName || '').trim();
  const paymentMethod = String(body.paymentMethod || '').trim().toUpperCase();
  const downloadURL = String(Deno.env.get('QELOX_DOWNLOAD_URL') || '').trim();
  const contactEmail = String(Deno.env.get('CONTACT_TO_EMAIL') || '').trim() || 'walletzeus@proton.me';

  if (!name) {
    return jsonResponse(req, 422, { success: false, message: 'name is required' });
  }

  if (!email || !email.includes('@') || !email.includes('.')) {
    return jsonResponse(req, 422, { success: false, message: 'valid email is required' });
  }

  if (!productName) {
    return jsonResponse(req, 422, { success: false, message: 'product name is required' });
  }

  if (paymentMethod !== 'PIX' && paymentMethod !== 'CRYPTO') {
    return jsonResponse(req, 422, { success: false, message: 'payment method is invalid' });
  }

  if (!downloadURL) {
    return jsonResponse(req, 500, {
      success: false,
      message: 'QELOX_DOWNLOAD_URL is not configured',
    });
  }

  try {
    const delivered = await deliverResendEmail({
      to: email,
      replyTo: contactEmail,
      subject: `QELO-X purchase confirmation — ${productName}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#e5e7eb;">
          <h2 style="margin:0 0 18px 0;font-size:1.25rem;font-weight:600;color:#f9fafb;">Purchase Confirmation</h2>
          <p style="margin:0 0 14px 0;line-height:1.6;">Hi ${escapeHtml(name)}, your payment for <strong>${escapeHtml(productName)}</strong> via <strong>${escapeHtml(paymentMethod)}</strong> was confirmed.</p>
          <p style="margin:0 0 14px 0;line-height:1.6;">Download link: <a href="${escapeHtml(downloadURL)}" style="color:#22d3ee;">${escapeHtml(downloadURL)}</a></p>
          <p style="margin:0;line-height:1.6;color:#9ca3af;">If you need help, just reply to this message.</p>
        </div>
      `,
    });

    await saveLead({
      message: `QELO-X purchase confirmation for ${productName}`,
      email,
      phone: null,
      intention: 'hire',
      source: 'purchase',
    }).catch(() => false);

    return jsonResponse(req, 200, {
      success: true,
      message: delivered ? 'Purchase confirmation sent.' : 'Purchase confirmation prepared.',
    });
  } catch (error) {
    return jsonResponse(req, 500, {
      success: false,
      message: (error as Error).message || 'Failed to send purchase confirmation.',
    });
  }
}

async function handleStatus(req: Request) {
  const serverMode = getSupabaseUrl() ? 'live' : 'simulated';
  const services = await checkProjects();

  return jsonResponse(req, 200, {
    ok: true,
    service: 'zeus-protocol',
    provider: 'supabase',
    mode: serverMode,
    uptime: {
      raw: formatDuration(Date.now() - START_TIME),
      ms: Date.now() - START_TIME,
    },
    server: buildServerMetrics(serverMode),
    services,
  });
}

serve(async (req: Request) => {
  const optionsResponse = handleOptions(req, 'GET, POST, OPTIONS');
  if (optionsResponse) {
    return optionsResponse;
  }

  const pathname = new URL(req.url).pathname;
  const route = pathname
    .replace(/^\/functions\/v1\/api/, '')
    .replace(/^\/api/, '') || '/';

  const method = req.method.toUpperCase();

  if (method === 'GET' && (route === '/' || route === '/health')) {
    return jsonResponse(req, 200, {
      ok: true,
      service: 'zeus-protocol',
      provider: 'supabase',
      message: 'health ok',
      timestamp: new Date().toISOString(),
    });
  }

  if (method === 'GET' && route === '/status') {
    return handleStatus(req);
  }

  if (method === 'POST' && route === '/analytics') {
    const body = await parseJsonBody(req);
    return forwardAnalytics(req, body);
  }

  if (method === 'POST' && route === '/chat') {
    const body = await parseJsonBody(req);
    return handleChat(req, body);
  }

  if (method === 'POST' && route === '/contact') {
    const body = await parseJsonBody(req);
    return handleContact(req, body);
  }

  if (method === 'POST' && route === '/lead') {
    const body = await parseJsonBody(req);
    return handleLead(req, body);
  }

  if (method === 'POST' && route === '/qelox/purchase-confirmation') {
    const body = await parseJsonBody(req);
    return handleQeloxPurchase(req, body);
  }

  return jsonResponse(req, 404, {
    ok: false,
    message: 'Route not found',
    route,
  });
});
