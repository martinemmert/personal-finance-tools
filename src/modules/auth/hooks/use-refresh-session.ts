import { useAuthStore } from "_modules/auth/hooks/use-auth-store";

export function useRefreshSession() {
  const authStore = useAuthStore();

  return async function () {
    let userIsAuthenticated = false;
    const { data } = await authStore.supabase.auth.refreshSession();

    if (data) userIsAuthenticated = true;

    if (!userIsAuthenticated) {
      const { data } = await authStore.supabase.auth.getSessionFromUrl({ storeSession: true });
      if (data) userIsAuthenticated = true;
    }

    return userIsAuthenticated;
  };
}
