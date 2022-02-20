import { SupabaseClient } from "@supabase/supabase-js";
import { acceptHMRUpdate, defineStore } from "pinia";
import { definitions } from "_@types/supabase";

export type ServiceSubscription = definitions["service_subscriptions"];
export type ServiceSubscriptionFormData = Pick<
  ServiceSubscription,
  "name" | "fee" | "fee_recurrence"
>;

function fromServiceSubscriptions(client: SupabaseClient) {
  return client.from<ServiceSubscription>("service_subscriptions");
}

export const useServiceSubscriptions = defineStore("serviceSubscriptions", {
  state: () => {
    return {
      items: [] as ServiceSubscription[],
    };
  },
  getters: {
    getServiceSubscriptionById() {
      return (id: string) => this.items.find((item) => item.id === id);
    },
  },
  actions: {
    async fetch() {
      const response = await fromServiceSubscriptions(this.supabase).select();
      if (response.error) throw response.error;
      if (response.data) this.items = response.data;
    },
    async create(data: ServiceSubscriptionFormData) {
      const response = await fromServiceSubscriptions(this.supabase).insert(data).single();
      console.log(response);
      if (response.error) throw response.error;
      if (response.data) this.items.push(response.data);
    },
    async update(id: string, data: ServiceSubscriptionFormData) {
      const response = await fromServiceSubscriptions(this.supabase)
        .update(data)
        .match({ id })
        .single();
      if (response.error) throw response.error;
      if (response.data) {
        const itemIndex = this.items.findIndex((item) => item.id === id);
        if (itemIndex > -1) this.items.splice(itemIndex, 1, response.data);
        if (itemIndex < 0) this.items.push(response.data);
      }
    },
    async delete(id: string) {
      const response = await fromServiceSubscriptions(this.supabase)
        .delete()
        .match({ id })
        .single();

      if (response.error) throw response.error;
      if (response.data) {
        const itemIndex = this.items.findIndex((item) => item.id === id);
        if (itemIndex > -1) this.items.splice(itemIndex, 1);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useServiceSubscriptions, import.meta.hot));
}
