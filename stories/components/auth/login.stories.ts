import LoginPage from "_modules/auth/components/login-page.vue";
import { Story } from "@storybook/vue3";
import vueRouter from "storybook-vue3-router";

/* define our custom routes */
const customRoutes = [
  {
    path: "/",
    component: LoginPage,
  },
];

export default {
  title: "authentication/LoginPage",
  component: LoginPage,
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

const Template: Story<typeof LoginPage> = (args) => ({
  components: { LoginPage },
  setup() {
    return { args };
  },
  template: `
      <router-view/>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
Default.args = {};
