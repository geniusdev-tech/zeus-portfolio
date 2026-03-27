export type LeadInsert = {
  message: string;
  email: string | null;
  phone: string | null;
  intention: string;
  source: string;
};

function normalizeBaseUrl(url: string | undefined): string {
  return String(url || '').trim().replace(/\/$/, '');
}

export function getSupabaseConfig() {
  const url = normalizeBaseUrl(
    Deno.env.get('SUPABASE_URL') ||
    Deno.env.get('APP_SUPABASE_URL') ||
    Deno.env.get('SUPABASE_PROJECT_URL') ||
    ''
  );
  const serviceRoleKey = String(
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ||
    Deno.env.get('APP_SUPABASE_SERVICE_ROLE_KEY') ||
    Deno.env.get('SUPABASE_KEY') ||
    ''
  ).trim();
  const leadsTable = String(Deno.env.get('SUPABASE_LEADS_TABLE') || Deno.env.get('APP_SUPABASE_LEADS_TABLE') || 'leads').trim();

  return {
    url,
    serviceRoleKey,
    leadsTable,
    configured: Boolean(url && serviceRoleKey),
  };
}

export async function insertLead(row: LeadInsert): Promise<boolean> {
  const config = getSupabaseConfig();
  if (!config.configured) {
    return false;
  }

  const response = await fetch(`${config.url}/rest/v1/${config.leadsTable}`, {
    method: 'POST',
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase insert failed: status ${response.status} body ${errorText}`);
  }

  return true;
}
