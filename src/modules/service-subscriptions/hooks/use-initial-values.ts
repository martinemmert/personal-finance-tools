import { useRoute } from "vue-router";
import { useServiceSubscriptions } from "_modules/service-subscriptions/store";

export function useInitialValues() {
  const route = useRoute();
  const store = useServiceSubscriptions();

  const { params } = route;
  if (!params.id) return undefined;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return store.getServiceSubscriptionById(id);
}
