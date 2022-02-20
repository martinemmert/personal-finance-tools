import Alert from "_components/atoms/alert.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/Alert",
  component: Alert,
  args: {
    message: "Message"
  }
};

const Template: Story<typeof Alert> = (args) => ({
  components: { Alert },
  setup() {
    return { args };
  },
  template: `<Alert v-bind="args">{{ args.default }}</Alert>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
