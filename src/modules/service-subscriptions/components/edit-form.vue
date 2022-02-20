<script setup lang="ts">
import { Form, useIsSubmitting } from "vee-validate";
import Button from "_components/atoms/button.vue";
import FormHeader from "_components/atoms/form-header.vue";
import Label from "_components/atoms/label.vue";
import TextInputMessage from "_components/atoms/text-input-message.vue";
import FormActions from "_components/layout/form-actions.vue";
import HorizontalFieldset from "_components/layout/horizontal-fieldset.vue";
import SelectField from "_components/vee-validate/select-field.vue";
import TextInputErrorMessage from "_components/vee-validate/text-input-error-message.vue";
import TextInputField from "_components/vee-validate/text-input-field.vue";
import { SubmitHandler, useEditForm } from "_modules/service-subscriptions/use-edit-form";

type Props = {
  submitHandler: SubmitHandler;
};

type Emits = {
  (e: "submit"): void;
  (e: "submitted"): void;
  (e: "resetted"): void;
  (e: "cancel"): void;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const { handleSubmit, handleReset } = useEditForm(props.submitHandler, emit);
const isSubmitting = useIsSubmitting();
</script>

<template>
  <form class="form" @submit="handleSubmit" @reset="handleReset">
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
      <Button type="reset" variant="simple" :disabled="isSubmitting" @click="emit('cancel')">
        Cancel
      </Button>
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
