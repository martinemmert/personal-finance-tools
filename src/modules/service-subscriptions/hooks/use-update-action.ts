import { useServiceSubscriptions } from "_modules/service-subscriptions/store";

export function useUpdateAction() {
  const store = useServiceSubscriptions();
  return store.update;
}
