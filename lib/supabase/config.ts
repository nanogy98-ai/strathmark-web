const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
const supabaseAdminKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;

export function getSupabaseAdminConfig() {
  return {
    url: supabaseUrl,
    adminKey: supabaseAdminKey,
  };
}

export function isSupabaseAdminConfigured() {
  return Boolean(supabaseUrl && supabaseAdminKey);
}
