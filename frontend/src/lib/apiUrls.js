const LOCAL_API_BASE_URL = 'http://localhost:54321/functions/v1';
const LOCAL_CHAT_API_BASE_URL = `${LOCAL_API_BASE_URL}/api`;
const PROD_API_BASE_URL = 'https://kucdkggpxscjxksnhrma.supabase.co/functions/v1';
const PROD_CHAT_API_BASE_URL = `${PROD_API_BASE_URL}/api`;

function normalizeAbsoluteUrl(url, fallback) {
  if (typeof url !== 'string') {
    return fallback;
  }

  const match = url.match(/^https?:\/\/[^\s]+$/);
  return match ? url.replace(/\/$/, '') : fallback;
}

export function resolveApiBaseUrl(url) {
  const fallback = import.meta.env.DEV ? LOCAL_API_BASE_URL : PROD_API_BASE_URL;
  return normalizeAbsoluteUrl(url, fallback);
}

export function resolveChatApiBaseUrl(url) {
  const fallback = import.meta.env.DEV ? LOCAL_CHAT_API_BASE_URL : PROD_CHAT_API_BASE_URL;
  return normalizeAbsoluteUrl(url, fallback);
}
