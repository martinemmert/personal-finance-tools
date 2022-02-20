import { ref } from "vue";

export function useConfirmDialog(sticky?: boolean) {
  let resolvePromise: (value: boolean) => void;

  const open = ref(false);
  const loading = ref(false);

  function show() {
    open.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  }

  function confirm() {
    if (!sticky) open.value = false;
    resolvePromise(true);
  }

  function cancel() {
    if (!sticky) open.value = false;
    resolvePromise(false);
  }

  function setLoading(value: boolean) {
    loading.value = value;
  }

  function setOpen(value: boolean) {
    open.value = value;
  }

  return { open, loading, show, confirm, cancel, setLoading, setOpen };
}
