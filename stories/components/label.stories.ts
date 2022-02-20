import Label from "_components/atoms/label.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/Label",
  component: Label,
  argTypes: {
    default: {
      control: "text",
      description: "slot content",
      defaultValue: "Label Text",
    },
  },
};

const Template: Story<typeof Label> = (args) => ({
  components: { Label },
  setup() {
    return { args };
  },
  template: `<Label v-bind="args">{{ args.default }}</Label>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
