import { useServiceSubscriptions } from "_modules/service-subscriptions/store";
import { useConfirmDialog } from "_hooks/use-confirm-dialog";
import { ref } from "vue";

export function useDeleteServiceSubscription() {
  const dialog = useConfirmDialog(true);
  const store = useServiceSubscriptions();
  const serviceName = ref("");

  async function deleteServiceSubscription(id: string) {
    const item = store.getServiceSubscriptionById(id);
    if (!item) return false;
    serviceName.value = item.service_name;
    const confirm = await dialog.show();
    if (confirm) {
      dialog.setLoading(true);
      await store.delete(id);
      dialog.setLoading(false);
    }
    dialog.setOpen(false);
  }

  return {
    serviceName,
    dialogOpen: dialog.open,
    dialogLoading: dialog.loading,
    showDialog: deleteServiceSubscription,
    confirmDialog: dialog.confirm,
    cancelDialog: dialog.cancel,
  };
}
