import { createPinia } from "pinia";
import { SupabasePiniaPlugin } from "./plugins/supabase";

export const pinia = createPinia();
pinia.use(SupabasePiniaPlugin);
