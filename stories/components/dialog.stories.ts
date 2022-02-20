import Dialog from "_components/overlays/dialog.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "Overlays/Dialog",
  component: Dialog,
  args: {
    open: true,
    showIcon: true,
    title: "Modal title",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.",
    confirmButtonLabel: "Confirm",
    cancelButtonLabel: "",
  },
  argTypes: {
    onClose: {
      action: "close",
    },
    onConfirm: {
      action: "confirm",
    },
    onCancel: {
      action: "cancel",
    },
    layout: {
      description: "modal layout",
      control: {
        type: "select",
      },
      options: ["simple", "centered", "centered-wide"],
    },
    confirmButtonVariant: {
      description: "style variant",
      control: {
        type: "select",
      },
      options: ["simple", "cta", "positive", "negative"],
    },
    cancelButtonVariant: {
      description: "style variant",
      control: {
        type: "select",
      },
      options: ["simple", "cta", "positive", "negative"],
    },
  },
};

const Template: Story<typeof Dialog> = (args) => ({
  components: { Dialog },
  setup() {
    return { args };
  },
  template: `<Dialog v-bind="args">Hello</Dialog>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
Default.args = {};
