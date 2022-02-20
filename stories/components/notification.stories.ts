import Notification from "_components/atoms/notification.vue";
import { Story } from "@storybook/vue3";

export default {
    title: "atoms/Notifications",
    component: Notification,
    argTypes: {
        default: {
            control: "text",
            description: "slot content",
            defaultValue: "Label Text",
        },
    },
};

const Template: Story<typeof Notification> = (args) => ({
    components: { Notification },
    setup() {
        return { args };
    },
    template: `<Notification v-bind="args">{{ args.default }}</Notification>`,
});

export const Default = Template.bind({});
Default.storyName = "default";
