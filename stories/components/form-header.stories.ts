import FormHeader from "_components/atoms/form-header.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "atoms/FormHeader",
  component: FormHeader,
};

const Template: Story<typeof FormHeader> = (args) => ({
  components: { FormHeader },
  setup() {
    return { args };
  },
  template: `<FormHeader v-bind="args" />`,
});

export const TitleOnly = Template.bind({});
TitleOnly.storyName = "title only";
TitleOnly.args = {
  title: "Lorem ipsum",
};

export const WithSubtitle = Template.bind({});
WithSubtitle.storyName = "with subtitle";
WithSubtitle.args = {
  title: "Lorem ipsum",
  subtitle: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
};
