<script lang="ts">
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { defineComponent } from "vue";
import FormControl from "../../components/form/form-control.vue";
import Label from "../../components/form/label.vue";
import { CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from "../../store/mutation-types";
import { SubscriptionFormData } from "../../types";
import TextInput from "../../components/form/text-input.vue";

export default defineComponent({
  components: {
    FormControl,
    Label,
    TextInput
  },
  props: {
    id: String,
  },
  data() {
    let formData: Partial<SubscriptionFormData> = {
      name: "",
      start_date: "",
      fee: 0,
    };

    if (this.$props.id) {
      const item = this.$store.getters.getSubscription(this.$props.id);
      formData = { ...item };
    }

    return {
      isSubmitting: false,
      formData,
    }
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      formData: {
        name: { required },
        start_date: { required },
        fee: { required }
      }
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) console.error(this.v$.$errors);
      this.isSubmitting = true;
      if (this.$props.id) {
        await this.$store.dispatch({
          type: UPDATE_SUBSCRIPTION,
          id: this.$props.id,
          item: this.formData
        })
      } else {
        await this.$store.dispatch({ type: CREATE_SUBSCRIPTION, item: this.formData });
      }
      this.isSubmitting = false;
      this.$emit("formSubmitted");
    },
    cancelForm() {
      this.$emit("formCancelled");
    }
  }
});
</script>

<template>
  <div class="modal modal-open">
    <section class="modal-box">
      <form @submit.prevent="submitForm">
        <FormControl>
          <Label>Name</Label>
          <TextInput v-model="formData.name" :readonly="isSubmitting" />
        </FormControl>
        <FormControl>
          <Label>Start Date</Label>
          <TextInput v-model="formData.start_date" type="date" :readonly="isSubmitting" />
        </FormControl>
        <FormControl>
          <Label>Fee</Label>
          <label class="input-group">
            <TextInput class="flex-1" v-model="formData.fee" type="number" :readonly="isSubmitting" />
            <span>€</span>
          </label>
        </FormControl>
        <div class="flex justify-end mt-6">
          <button
            v-if="!isSubmitting"
            type="button"
            class="btn btn-outline btn-error mr-3"
            @click="cancelForm"
          >Cancel</button>
          <button type="submit" class="btn btn-primary" :class="{ loading: isSubmitting }">Submit</button>
        </div>
      </form>
    </section>
  </div>
</template>