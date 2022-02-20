import TextInputMessage from "_components/atoms/text-input-message.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/TextInputMessage",
  component: TextInputMessage,
  argTypes: {
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Message'
    },
    variant: {
      description: "style variant",
      control: {
        type: "select",
        options: [null, "positive", "negative"],
      },
    },
  }
};

const Template: Story<typeof TextInputMessage> = (args) => ({
  components: { TextInputMessage },
  setup() {
    return {
      args,
    };
  },
  template: `<TextInputMessage v-bind="args">{{args.default}}</TextInputMessage>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
Default.args = {
  variant: null,
};
