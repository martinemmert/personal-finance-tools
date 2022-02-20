import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";
import { appRouter } from "./router/app-router";
import { pinia } from "_store/pinia";

const app = createApp(App);
app.use(pinia);
app.use(appRouter);
app.mount("#app");
