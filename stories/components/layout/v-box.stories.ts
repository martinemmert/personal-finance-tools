import HorizontalFieldset from "_components/layout/horizontal-fieldset.vue";
import TextInput from "_components/atoms/text-input.vue";
import TextInputMessage from "_components/atoms/text-input-message.vue";
import Label from "_components/atoms/Label.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "layout/VBox",
  component: HorizontalFieldset,
};

const Template: Story<typeof HorizontalFieldset> = (args) => ({
  components: {
    Label,
    TextInput,
    TextInputMessage,
    HorizontalFieldset,
  },
  setup() {
    return {
      args,
      model: args.value ?? "",
    };
  },
  template: `
    <Form>
      <HorizontalFieldset v-bind="args">
        <template #label>
          <Label for="text-input">Label</Label>
        </template>
        <TextInput id="text-input" placeholder="TextInput" />
        <template #message>
          <TextInputMessage>Some Message</TextInputMessage>
        </template>
      </HorizontalFieldset>
      <HorizontalFieldset v-bind="args">
        <template #label>
          <Label for="text-input">Label</Label>
        </template>
        <TextInput id="text-input" placeholder="TextInput" />
        <template #message>
          <TextInputMessage>Some Message</TextInputMessage>
        </template>
      </HorizontalFieldset>
    </Form>  
  `,
});

export const Default = Template.bind({});
Default.storyName = "With Gaps";
Default.args = {};
