import EditForm from "_modules/service-subscriptions/components/edit-form.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "service-subscriptions/edit-form",
  component: EditForm,
  args: {
    resetAfterSubmit: false,
  },
  argTypes: {
    onSubmit: {
      action: "submit",
    },
    onReset: {
      action: "reset",
    },
    onSubmitted: {
      action: "submitted",
    },
    onCancel: {
      action: "cancel",
    },
  },
};

function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds));
}

const Template: Story<typeof EditForm> = (args) => ({
  components: { EditForm },
  setup() {
    async function submitHandler(values) {
      console.log("values", values);
      await wait(1000);
    }

    return { args, submitHandler };
  },
  template: `<EditForm v-bind="args" :submitHandler="submitHandler" />`,
});

export const Default = Template.bind({});

Default.storyName = "default";
Default.args = {};
