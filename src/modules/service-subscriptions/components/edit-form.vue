<script setup lang="ts">
import { Form, useForm } from "vee-validate";
import { InferType, number, object, string } from "yup";
import Button from "_components/atoms/button.vue";
import FormHeader from "_components/atoms/form-header.vue";
import Label from "_components/atoms/label.vue";
import TextInputMessage from "_components/atoms/text-input-message.vue";
import FormActions from "_components/layout/form-actions.vue";
import HorizontalFieldset from "_components/layout/horizontal-fieldset.vue";
import SelectField from "_components/vee-validate/select-field.vue";
import TextInputErrorMessage from "_components/vee-validate/text-input-error-message.vue";
import TextInputField from "_components/vee-validate/text-input-field.vue";

const validationSchema = object({
  service_name: string().required(),
  subscription_plan: string(),
  billing_period: string()
    .required()
    .matches(/weekly|monthly/),
  price: number().required().min(0),
});

type FormValues = InferType<typeof validationSchema>;

type Props = {
  submitHandler: (values: FormValues) => void | Promise<void>;
  resetAfterSubmit?: boolean;
};

type Emits = {
  (e: "submit", values: FormValues): void;
  (e: "submitted", values: FormValues): void;
  (e: "reset"): void;
  (e: "cancel"): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// TODO: put this into a useEditForm hook

const { handleSubmit, handleReset, isSubmitting } = useForm<FormValues>({ validationSchema });
const onSubmit = handleSubmit(async (values, actions) => {
  emit("submit", values);
  await props.submitHandler(values);
  emit("submitted", values);
  if (props.resetAfterSubmit) {
    actions.resetForm();
    emit("reset");
  }
});

const deferredSubmitHandler = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  if (isSubmitting.value) return;
  onSubmit(event);
};
</script>

<template>
  <form class="form" @submit="deferredSubmitHandler" @reset="handleReset">
    <FormHeader
      title="Add new service subscription"
      subtitle="Provide the details about an service you have subscribed to."
    />
    <HorizontalFieldset>
      <template #label>
        <Label for="service_name">Service name</Label>
      </template>
      <TextInputField
        id="service_name"
        name="service_name"
        placeholder="Netflix, Amazon Prime, Spotify, etc ..."
      />
      <template #message>
        <TextInputErrorMessage name="service_name" />
      </template>
    </HorizontalFieldset>
    <HorizontalFieldset>
      <template #label>
        <Label for="subscription_plan">Subscription plan</Label>
      </template>
      <TextInputField
        id="subscription_plan"
        name="subscription_plan"
        placeholder="mobile, basic, standard, premium, etc ..."
      />
      <template #message>
        <TextInputErrorMessage name="subscription_plan" />
        <TextInputMessage>
          How does the service provider call the plan you subscribed to?
        </TextInputMessage>
      </template>
    </HorizontalFieldset>
    <HorizontalFieldset>
      <template #label>
        <Label for="billing_period">Billing period</Label>
      </template>
      <SelectField id="billing_period" name="billing_period">
        <option value="" disabled>Choose option...</option>
        <option value="weekly">weekly</option>
        <option value="monthly">monthly</option>
      </SelectField>
      <template #message>
        <TextInputErrorMessage name="billing_period" />
      </template>
    </HorizontalFieldset>
    <HorizontalFieldset>
      <template #label>
        <Label for="price">Service price</Label>
      </template>
      <TextInputField id="price" name="price" placeholder="0,00" type="number" min="0" step="0.1" />
      <template #message>
        <TextInputErrorMessage name="price" />
      </template>
    </HorizontalFieldset>
    <FormActions>
      <Button variant="simple" :disabled="isSubmitting" @click="emit('cancel')">Cancel</Button>
      <Button type="submit" variant="cta" :loading="isSubmitting">Save</Button>
    </FormActions>
  </form>
</template>

<style lang="postcss">
.form {
  @apply mt-6 space-y-6 px-6 sm:mt-5 sm:space-y-5;

  .horizontal-fieldset:not(:first-child) {
    @apply sm:border-t sm:border-gray-200 sm:pt-5;
  }

  .form-actions {
    @apply -mx-6;
  }
}
</style>
