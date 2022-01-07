import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";
import { key, store } from "./store";
import SubscriptionView from "./views/subscriptions/index.vue";
import EditItemView from "./views/subscriptions/edit-item.vue";
import LoginView from "./views/login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SubscriptionView,
      children: [
        {
          path: "/create",
          components: {
            form: EditItemView,
          },
        },
        {
          path: "/edit/:id",
          props: true,
          components: {
            form: EditItemView,
          },
        },
      ],
    },
    {
      name: "login",
      path: "/login",
      component: LoginView,
    },
  ],
});

const app = createApp(App);
app.use(store, key);
app.use(router);
app.mount("#app");
