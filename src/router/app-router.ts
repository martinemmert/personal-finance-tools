import { createRouter, createWebHistory } from "vue-router";
import serviceSubscriptions from "_modules/service-subscriptions";

export const appRouter = createRouter({
  history: createWebHistory(),
  routes: [...serviceSubscriptions.getRoutes()],
});
