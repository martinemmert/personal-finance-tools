import Modal from "_components/overlays/modal.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "Overlays/Modal",
  component: Modal,
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
      action: "close"
    },
    onConfirm: {
      action: "confirm"
    },
    onCancel: {
      action: "cancel"
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

const Template: Story<typeof Modal> = (args) => ({
  components: { Modal },
  setup() {
    return { args };
  },
  template: `<Modal v-bind="args">{{ args.default }}</Modal>`,
});

export const Default = Template.bind({});
Default.storyName = "layout: default";
Default.args = {};

export const Centered = Template.bind({});
Centered.storyName = "layout: centered";
Centered.args = {
  layout: "centered",
};

export const CenteredWide = Template.bind({});
CenteredWide.storyName = "layout: centered-wide";
CenteredWide.args = {
  layout: "centered-wide",
};

export const CancelButton = Template.bind({});
CancelButton.storyName = "with cancel button";
CancelButton.args = {
  cancelButtonLabel: "Cancel",
};
