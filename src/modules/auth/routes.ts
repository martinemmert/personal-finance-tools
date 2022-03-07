import { RouteRecordRaw } from "vue-router";
import LoginPage from "./components/login-page.vue";
import SignUpPage from "./components/sign-up-page.vue";
import RefreshSessionPage from "./components/refresh-session-page.vue";
import { useAuthStore } from "_modules/auth/hooks/use-auth-store";

export function getRoutes(baseUrl: string = ""): RouteRecordRaw[] {
  return [
    {
      path: `${baseUrl}/login`,
      name: "auth-login",
      component: LoginPage,
      meta: { noAuthRequired: true },
      async beforeEnter(to, from) {
        const authStore = useAuthStore();
        if (authStore.auth.session) return from;
        return true;
      },
    },
    {
      path: `${baseUrl}/sign-up`,
      name: "auth-sign-up",
      component: SignUpPage,
      meta: { noAuthRequired: true },
      // async beforeEnter(to, from) {
      //   const authStore = useAuthStore();
      //   if (authStore.auth.session) return from;
      //   return true;
      // },
    },
    {
      path: `${baseUrl}/refresh-session`,
      name: "auth-refresh-session",
      component: RefreshSessionPage,
      meta: { noAuthRequired: true },
    },
  ];
}
