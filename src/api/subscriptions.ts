import { Subscription, SubscriptionFormData } from "../types";
import supabaseClient from "./supabase-client";

const client = supabaseClient;

const fromSubscriptions = () => client.from<Subscription>("subscriptions");

export async function createSubscription(data: SubscriptionFormData) {
  const response = await fromSubscriptions().insert({
    name: data.name,
    start_date: data.start_date,
    fee: data.fee,
  });

  return response;
}

export async function updateSubscription(
  id: string,
  data: SubscriptionFormData
) {
  const respone = await fromSubscriptions().update(data).match({ id });
  return respone.data;
}

export async function deleteSubscription(id: string) {
  const response = await fromSubscriptions().delete().match({ id });
  console.log(response);
}

export async function loadSubscriptions() {
  const response = await fromSubscriptions().select();
  return response.data;
}
