import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdminConfig } from "@/lib/supabase/config";

let adminClient: ReturnType<typeof createClient> | null = null;

export function createAdminClient() {
  if (adminClient) {
    return adminClient;
  }

  const { url, adminKey } = getSupabaseAdminConfig();
  if (!url || !adminKey) {
    throw new Error("Supabase admin configuration is missing.");
  }

  adminClient = createClient(url, adminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}
