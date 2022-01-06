import TextInput from "./text-input.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "form/TextInput",
  component: TextInput,
};

const Template: Story<typeof TextInput> = (args) => ({
  components: { TextInput },
  setup() {
    return { args };
  },
  template: `<TextInput v-bind="args" />`,
});

export const Default = Template.bind({});
Default.storyName = "default";
Default.args = {
  borderless: false,
  ghost: false,
};
