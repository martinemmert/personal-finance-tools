import SelectControl from "_components/atoms/select-control.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/SelectControl",
  component: SelectControl,
};

const Template: Story<typeof SelectControl> = (args) => ({
  components: { SelectControl },
  setup() {
    return {
      args,
      model: args.value ?? "",
    };
  },
  template: `
  <SelectControl v-bind="args" v-model="model">
    <option value="a">Option A</option>
    <option value="b">Option B</option>
  </SelectControl>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
Default.args = {
  hasError: false,
};
