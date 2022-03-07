import { createClient, Session, User } from "@supabase/supabase-js";
import { ref } from "vue";

export type AuthState = {
  user: User | null;
  session: Session | null;
};

const PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
};

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, options);

const _user = ref<User | null>(null);
const _session = ref<Session | null>(null);

supabase.auth.onAuthStateChange((event, session) => {
  _session.value = session;
  _user.value = session ? session.user : null;
});

const auth = {
  get user() {
    return _user;
  },
  get session() {
    return _session;
  },
};

export interface ISupabasePiniaPlugin {
  get auth(): typeof auth;

  get supabase(): typeof supabase;
}

export function SupabasePiniaPlugin() {
  return {
    auth,
    supabase,
  };
}
