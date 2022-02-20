import Spinner from "_components/atoms/spinner.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/Spinner",
  component: Spinner,
};

const Template: Story<typeof Spinner> = (args) => ({
  components: { Spinner },
  setup() {
    return { args };
  },
  template: `<Spinner v-bind="args" />`,
});

export const Default = Template.bind({});

Default.storyName = "default";
Default.args = {};
