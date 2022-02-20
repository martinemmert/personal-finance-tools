import Page from "_modules/service-subscriptions/components/page.vue";
import { Story } from "@storybook/vue3";
import vueRouter from "storybook-vue3-router";

const demoData = [
  {
    id: 1,
    service_name: "Netflix",
    subscription_plan: "Basic",
    billing_period: "monthly",
    price: 9.99,
  },
  {
    id: 2,
    service_name: "Spotify",
    subscription_plan: "Basic",
    billing_period: "monthly",
    price: 9.99,
  },
  {
    id: 3,
    service_name: "Amazon Prime",
    subscription_plan: "Basic",
    billing_period: "monthly",
    price: 9.99,
  },
  {
    id: 4,
    service_name: "Hulu",
    subscription_plan: "Basic",
    billing_period: "monthly",
    price: 9.99,
  },
  {
    id: 5,
    service_name: "Disney +",
    subscription_plan: "Basic",
    billing_period: "monthly",
    price: 9.99,
  },
];

/* define our custom routes */
const customRoutes = [
  {
    path: "/",
    name: "home",
    component: {
      components: { Page },
      data: () => ({
        data: demoData,
      }),
      template: `
              <Pag :data="data"/>`,
    },
    children: [
      {
        name: "create-subscription-service",
        path: "/create",
        component: {},
      },
      {
        name: "edit-subscription-service",
        path: "/edit/:id",
        component: {},
      },
    ],
  },
];

export default {
  title: "service-subscriptions/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    vueRouter(customRoutes),
    (story: () => unknown) => {
      document.documentElement.classList.add("h-full");
      document.body.classList.add("h-full");
      document.body.classList.add("bg-gray-100");
      return story();
    },
  ],
  args: {},
};

const Template: Story<typeof Page> = (args) => ({
  components: { Page },
  setup() {
    return { args };
  },
  template: `
      <router-view/>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
Default.args = {};

export const Empty = Template.bind({});
Empty.storyName = "empty";
Empty.args = {
  data: [],
};
