import Button from "_components/atoms/button.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/Button",
  component: Button,
  args: {
    rounded: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      description: "style variant",
      control: {
        type: "select",
        options: ["simple", "cta", "positive", "negative"],
      },
    },
    size: {
      description: "size variant",
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
  },
};

const Template: Story<typeof Button> = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: `<Button v-bind="args">Label</Button>`,
});

export const Default = Template.bind({});

Default.storyName = "default";

Default.args = {
  variant: "simple",
};
