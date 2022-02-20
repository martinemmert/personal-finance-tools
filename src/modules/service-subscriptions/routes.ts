import { RouteRecordRaw } from "vue-router";
import Page from "./components/page.vue";

export function getRoutes(baseUrl: string = ""): RouteRecordRaw[] {
  return [
    {
      path: `${baseUrl}/`,
      name: "service-subscriptions",
      component: Page,
    },
    {
      path: `${baseUrl}/create`,
      name: "create-subscription-service",
      component: Page,
    },
    {
      path: `${baseUrl}/create/:id`,
      name: "edit-subscription-service",
      component: Page,
    },
  ];
}
