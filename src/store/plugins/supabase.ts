import { createClient, Session, User } from "@supabase/supabase-js";
import { PiniaPluginContext } from "pinia";
import { readonly, ref } from "vue";

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

const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
  options
);

const _user = ref<User | null>(null);
const _session = ref<Session | null>(null);

supabase.auth.onAuthStateChange((event, session) => {
  _session.value = session;
  _user.value = session ? session.user : null;
});

const auth = {
  get user() {
    return readonly(_user);
  },
  get session() {
    return readonly(_session);
  },
  get signIn() {
    return supabase.auth.signIn;
  },
  get signOut() {
    return supabase.auth.signOut;
  },
  get signUp() {
    return supabase.auth.signUp;
  },
  get update() {
    return supabase.auth.update;
  },
  get getUser() {
    return supabase.auth.api.getUser;
  },
  get onAuthStateChange() {
    return supabase.auth.onAuthStateChange;
  },
  get resetPasswordForEmail() {
    return supabase.auth.api.resetPasswordForEmail;
  },
};

export interface ISupabasePiniaPlugin {
  get auth(): typeof auth;
  get supabase(): typeof supabase;
}

export function SupabasePiniaPlugin(context: PiniaPluginContext) {
  return {
    auth,
    supabase,
  };
}
