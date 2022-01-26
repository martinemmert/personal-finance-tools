import { ApiError, Session, User, UserCredentials } from "@supabase/supabase-js";
import { Router } from "vue-router";
import { Dispatch, DispatchOptions, Store } from "vuex";
import { AuthStoreState } from "./store/auth";
import { definitions } from "./supabase";

declare module "@vue/runtime-core" {
  interface State {
    subscriptions: {
      data: definitions["subscriptions"][];
      isLoading: Boolean;
    };
  }

  interface Dispatcher extends Dispatch {
    (type: "auth/signUp", payload: UserCredentials, options?: DispatchOptions): Promise<ApiError | undefined>;
    (type: "auth/signIn", payload: UserCredentials, options?: DispatchOptions): Promise<ApiError | undefined>;
  }
  interface Getters {
    getSubscription(id: string): definitions["subscriptions"] | null;
    ["auth/getCurrentAuthUser"](): User | null;
    ["auth/getCurrentAuthSession"](): Session | null;
  }

  interface TypedStore extends Store<State> {
    getters: Getters;
    dispatch: Dispatcher;
  }

  interface ComponentCustomProperties {
    $store: TypedStore;
    $router: Router;
  }
}
