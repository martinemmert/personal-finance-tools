import { createClient } from "@supabase/supabase-js";

const PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const options = {
  schema: "public",
  headers: {
    "x-my-custom-header": "personal-finance-tools",
  },
  autoRefreshToken: true,
  persistSession: true,
};

export default createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
  options
);

