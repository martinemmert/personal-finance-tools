import { Session, User, UserCredentials } from "@supabase/supabase-js";
import { Module } from "vuex";
import client from "../api/supabase-client";

export type AuthStoreState = {
  isSigningIn: boolean;
  isSigningUp: boolean;
};

export enum ACTIONS {
  AUTH_SIGN_UP = "signUp",
  AUTH_SIGN_IN = "signIn",
}

export const AuthStore: Module<AuthStoreState, unknown> = {
  namespaced: true,
  state: {
    isSigningIn: false,
    isSigningUp: false,
  },
  getters: {
    getCurrentAuthUser: (): User | null => {
      return client.auth.user();
    },
    getCurrentAuthSession: (): Session | null => {
      return client.auth.session();
    }
  },
  actions: {
    [ACTIONS.AUTH_SIGN_UP]: async function (context, payload: UserCredentials) {
      context.state.isSigningUp = true;
      const response = await client.auth.signUp(payload);
      context.state.isSigningUp = false;
      if (response.error) return response.error;
    },
    [ACTIONS.AUTH_SIGN_IN]: async function (context, payload: UserCredentials) {
      context.state.isSigningIn = true;
      const response = await client.auth.signIn(payload);
      context.state.isSigningIn = false;
      if (response.error) return response.error;
    },
  },
};
