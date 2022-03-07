import { createRouter, createWebHistory } from "vue-router";
import auth from "_modules/auth";
import serviceSubscriptions from "_modules/service-subscriptions";
import { useAuthStore } from "_modules/auth/hooks/use-auth-store";

declare module "vue-router" {
  interface RouteMeta {
    noAuthRequired?: boolean;
  }
}

export const appRouter = createRouter({
  history: createWebHistory(),
  routes: [...auth.getRoutes(), ...serviceSubscriptions.getRoutes()],
});

appRouter.beforeEach(async (to) => {
  // check if route is correct
  if (!to.name || typeof to.name === "undefined") throw new Error("Invalid target route!");

  const store = useAuthStore();
  const userIsAuthenticated = store.auth.session !== null;

  if (!userIsAuthenticated && !to.meta.noAuthRequired) {
    return {
      replace: true,
      name: "auth-refresh-session",
      query: { referer: to.name.toString() },
    };
  }

  return true;
});
