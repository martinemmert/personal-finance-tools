<script lang="ts">
import { minLength, required, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { computed, defineComponent, reactive, ref } from "vue";
import Spinner from "../components/form/spinner.vue";
import Alert from "../components/alert.vue";
import TextFieldInput from "../components/text-field-input.vue";
import TextFieldLabel from "../components/text-field-label.vue";
import TextFieldMessage from "../components/text-field-message.vue";

export default defineComponent({
  setup() {
    const isSubmitting = ref(false);
    const globalErrorMessage = ref("");
    const formData = reactive({
      email: "",
      password: "",
      verify_password: "",
    });

    const rules = computed(() => ({
      email: { required },
      password: { required, minLength: minLength(6) },
      verify_password: { required, sameAs: sameAs(formData.password, "Password") },
    }));

    return {
      isSubmitting,
      globalErrorMessage,
      formData,
      v$: useVuelidate(rules, formData),
    };
  },
  data() {
    return {
      registerSuccess: false,
    };
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        console.error(this.v$.$errors);
        return;
      }

      this.isSubmitting = true;
      this.globalErrorMessage = "";

      const error = await this.$store.dispatch("auth/signUp", {
        email: this.formData.email,
        password: this.formData.password,
      });

      if (error) {
        this.globalErrorMessage = error.message;
      } else {
        this.globalErrorMessage = "";
        this.registerSuccess = true;
      }

      this.isSubmitting = false;
    },
  },
  components: { Spinner, Alert, TextFieldInput, TextFieldLabel, TextFieldMessage },
});
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Alert v-if="registerSuccess" variant="success" message="Registration successful">
          <span
            >Please confirm your account with the email we just sent to your given email
            address.</span
          >
        </Alert>
        <template v-if="!registerSuccess">
          <Alert v-if="globalErrorMessage" class="mb-6" :message="globalErrorMessage" />
          <form class="space-y-6" @submit.prevent="submitForm">
            <div>
              <TextFieldLabel for="email">Email address</TextFieldLabel>
              <TextFieldInput
                id="email"
                name="email"
                type="email"
                class="mt-1"
                autocomplete="email"
                required
                v-model="formData.email"
                :readonly="isSubmitting"
                :has-error="v$.email.$error"
              />
              <template v-for="error of v$.email.$errors" :key="error.$uid">
                <TextFieldMessage :has-error="true">{{ error.$message }}</TextFieldMessage>
              </template>
            </div>

            <div>
              <TextFieldLabel for="password">Password</TextFieldLabel>
              <TextFieldInput
                id="password"
                name="password"
                type="password"
                class="mt-1"
                autocomplete="new-password"
                required
                v-model="formData.password"
                :readonly="isSubmitting"
                :has-error="v$.password.$error"
              />
              <template v-for="error of v$.password.$errors" :key="error.$uid">
                <TextFieldMessage :has-error="true">{{ error.$message }}</TextFieldMessage>
              </template>
            </div>

            <div>
              <TextFieldLabel for="verify_password">Verify Password</TextFieldLabel>
              <TextFieldInput
                id="verify_password"
                name="verify_password"
                type="password"
                class="mt-1"
                autocomplete="new-password"
                required
                v-model="formData.verify_password"
                :readonly="isSubmitting"
                :has-error="v$.verify_password.$error"
              />
              <template v-for="error of v$.verify_password.$errors" :key="error.$uid">
                <TextFieldMessage :has-error="true">{{ error.$message }}</TextFieldMessage>
              </template>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                :class="{ 'cursor-not-allowed': isSubmitting }"
                :disabled="isSubmitting"
              >
                <Spinner v-if="isSubmitting" class="mr-2" />
                <span>Sign up</span>
              </button>
            </div>
          </form>
          <div class="relative mt-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Already have an account?</span>
            </div>
          </div>
          <div class="mt-6">
            <a
              href="/login"
              class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
              >Sign In</a
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>