import TextInput from "_components/atoms/text-input.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/TextInput",
  component: TextInput,
};

const Template: Story<typeof TextInput> = (args) => ({
  components: { TextInput },
  setup() {
    return {
      args,
      model: args.value ?? "",
    };
  },
  template: `<TextInput v-bind="args" v-model="model" />`,
});

export const Default = Template.bind({});
Default.storyName = "default";
Default.args = {
  value: "text-input",
  hasError: false,
};
