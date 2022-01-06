import { Validation } from "@vuelidate/core";
import { Ref } from "vue";
import { Router } from "vue-router";
import { Store } from "vuex";
import { definitions } from "./supabase";

declare module "@vue/runtime-core" {
  interface State {
    subscriptions: {
      data: definitions["subscriptions"][];
      isLoading: Boolean;
    };
  }

  interface Getters {
    getSubscription(id: string): definitions["subscriptions"] | null;
  }

  interface TypedStore extends Store<State> {
    getters: Getters;
  }

  interface ComponentCustomProperties {
    $store: TypedStore;
    $router: Router;
  }
}
