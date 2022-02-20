import { useServiceSubscriptions } from "_modules/service-subscriptions/store";

export function useCreateAction() {
  const store = useServiceSubscriptions();
  return store.create;
}
