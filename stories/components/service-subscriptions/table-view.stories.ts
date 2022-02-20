import TableView from "_modules/service-subscriptions/components/table-view.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "service-subscriptions/table-view",
  component: TableView,
  args: {
    data: [
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
    ],
  },
  argTypes: {
    onEdit: {
      action: "edit",
    },
    onDelete: {
      action: "delete",
    },
  },
};

const Template: Story<typeof TableView> = (args) => ({
  components: { TableView },
  setup() {
    return { args };
  },
  template: `<TableView v-bind="args" />`,
});

export const Default = Template.bind({});

Default.storyName = "default";
Default.args = {};
