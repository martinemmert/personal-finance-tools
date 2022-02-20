import "pinia";

declare module "pinia" {
  export interface PiniaCustomProperties {
    auth: import("_store/plugins/supabase").ISupabasePiniaPlugin["auth"];
    supabase: import("_store/plugins/supabase").ISupabasePiniaPlugin["supabase"];
  }
}
