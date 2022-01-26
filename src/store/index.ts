import { InjectionKey, State, TypedStore } from "vue";
import { ActionContext, createStore, useStore as baseUseStore } from "vuex";
import {
  createSubscription,
  deleteSubscription,
  loadSubscriptions,
  updateSubscription,
} from "../api/subscriptions";
import { definitions } from "../supabase";
import { SubscriptionFormData } from "../types";
import { AuthStore } from "./auth";
import {
  CREATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  LOAD_SUBSCRIPTIONS,
  UPDATE_SUBSCRIPTION,
} from "./mutation-types";

enum _m_ {
  setIsLoading = "setIsLoading",
  addSubscription = "addSubscription",
  updateSubscription = "updateSubscription",
  addSubscriptions = "addSubscriptions",
  removeSubscription = "removeSubscription",
}

type SetIsLoadingPayload = { isLoading: boolean };
type AddSubscriptionPayload = { item: definitions["subscriptions"] };
type UpdateSubscriptionPayload = {
  id: string;
  item: definitions["subscriptions"];
};
type AddSubscriptionsPayload = { items: definitions["subscriptions"][] };
type RemoveSubscriptionPayload = { item: { id: string } };

function setIsLoadingTrue(context: ActionContext<State, State>) {
  context.commit({
    type: _m_.setIsLoading,
    isLoading: true,
  });
}

function setIsLoadingFalse(context: ActionContext<State, State>) {
  context.commit({
    type: _m_.setIsLoading,
    isLoading: false,
  });
}

export const store = createStore<State>({
  modules: {
    auth: AuthStore,
  },
  state() {
    return {
      subscriptions: {
        data: [],
        isLoading: false,
      },
    };
  },
  getters: {
    getSubscription: (state) => (id: string) => {
      return state.subscriptions.data.find((items) => {
        return items.id === id;
      });
    },
  },
  mutations: {
    [_m_.setIsLoading]: function (state, payload: SetIsLoadingPayload) {
      state.subscriptions.isLoading = payload.isLoading;
    },
    [_m_.addSubscription]: function (state, payload: AddSubscriptionPayload) {
      const data = state.subscriptions.data;
      data.push(payload.item);
    },
    [_m_.updateSubscription]: function (
      state,
      payload: UpdateSubscriptionPayload
    ) {
      const data = state.subscriptions.data;
      const oldItem = data.findIndex((item) => item.id === payload.id);
      if (oldItem) data.splice(oldItem, 1, payload.item);
    },
    [_m_.addSubscriptions]: function (state, payload: AddSubscriptionsPayload) {
      const data = state.subscriptions.data;
      data.push(...payload.items);
    },
    [_m_.removeSubscription]: function (
      state,
      payload: RemoveSubscriptionPayload
    ) {
      const data = state.subscriptions.data;
      const index = data.findIndex((item) => item.id === payload.item.id);
      state.subscriptions.data.splice(index, 1);
    },
  },
  actions: {
    [LOAD_SUBSCRIPTIONS]: async function (context) {
      setIsLoadingTrue(context);
      const data = await loadSubscriptions();
      if (data) {
        context.commit({
          type: _m_.addSubscriptions,
          items: data,
        });
      }
      setIsLoadingFalse(context);
    },
    [CREATE_SUBSCRIPTION]: async function (
      context,
      payload: { item: SubscriptionFormData }
    ) {
      await createSubscription(payload.item);
      context.commit({
        type: _m_.addSubscription,
        item: payload.item,
      });
    },
    [UPDATE_SUBSCRIPTION]: async function (
      context,
      payload: { id: string; item: SubscriptionFormData }
    ) {
      const updatedItems = await updateSubscription(payload.id, payload.item);

      if (!updatedItems) return;

      for (const updatedItem of updatedItems) {
        context.commit({
          type: _m_.updateSubscription,
          id: updatedItem.id,
          item: updatedItem,
        });
      }
    },
    [DELETE_SUBSCRIPTION]: async function (context, payload: { id: string }) {
      await deleteSubscription(payload.id);
      context.commit({
        type: _m_.removeSubscription,
        item: payload,
      });
    },
  },
});

export const key: InjectionKey<TypedStore> = Symbol();

export function useStore(): TypedStore {
  return baseUseStore(key);
}
