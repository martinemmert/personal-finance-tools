<script lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { defineComponent } from "vue";
import supabaseClient from "../api/supabase-client";
import Spinner from "../components/form/spinner.vue";
import Alert from "../components/alert.vue";

export default defineComponent({
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      isSubmitting: false,
      globalErrorMessage: "",
      formData: {
        email: "",
        password: ""
      }
    };
  },
  validations() {
    return {
      formData: {
        email: { required },
        password: { required }
      }
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

      const result = await supabaseClient.auth.signIn({
        email: this.formData.email,
        password: this.formData.password,
      });

      if (result.error) {
        this.globalErrorMessage = result.error.message;
      }

      this.isSubmitting = false;
    }
  },
  components: { Spinner, Alert }
});

</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Alert v-if="globalErrorMessage" class="mb-6" :message="globalErrorMessage" />
        <form class="space-y-6" @submit.prevent="submitForm">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="formData.email"
                :readonly="isSubmitting"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                v-model="formData.password"
                :readonly="isSubmitting"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >Forgot your password?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="{ 'cursor-not-allowed': isSubmitting }"
              :disabled="isSubmitting"
            >
              <Spinner v-if="isSubmitting" class="mr-2" />
              <span>Sign in</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>