import { definitions } from "./supabase";
export type Subscription = definitions["subscriptions"];
export type SubscriptionFormData = {
  name: string;
  fee: number;
  start_date: string;
};
