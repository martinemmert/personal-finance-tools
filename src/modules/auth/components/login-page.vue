<script setup lang="ts">
import TextInputField from "_components/vee-validate/text-input-field.vue";
import Button from "_components/atoms/button.vue";
import TextInputMessage from "_components/atoms/text-input-message.vue";
import Card from "_components/atoms/card.vue";
import { FormContextActions, FormValues, useLoginForm } from "_modules/auth/hooks/use-login-form";
import TextInputErrorMessage from "_components/vee-validate/text-input-error-message.vue";
import { useIsSubmitting } from "vee-validate";

export type EventEmitter = {
  (e: "submit", values: FormValues, actions: FormContextActions): void;
  (e: "submitted", values: FormValues, actions: FormContextActions): void;
};

const emits = defineEmits<EventEmitter>();

const { handleSubmit } = useLoginForm(emits);
const isSubmitting = useIsSubmitting();
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back!</h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Card>
        <form @submit="handleSubmit" class="space-y-6" action="#" method="POST">
          <div>
            <TextInputField placeholder="E-Mail Address" name="email" />
            <TextInputErrorMessage class="mt-1" name="email" />
          </div>
          <div>
            <Button type="submit" class="w-full" variant="cta" :loading="isSubmitting"
              >Login</Button
            >
          </div>
        </form>
        <p class="mt-6 space-x-1 text-center text-sm">
          <span>No account?</span>
          <RouterLink class="text-indigo-600 hover:text-indigo-500" to="/sign-up"
            >Sign Up
          </RouterLink>
        </p>
      </Card>
      <div class="mt-4 text-center">
        <TextInputMessage
          >Please enter the e-mail you signed up with and hit the login button.<br />We will send a
          link to your inbox to log you safely in.
        </TextInputMessage>
      </div>
    </div>
  </div>
</template>
