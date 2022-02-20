<script setup lang="ts">
import { useField } from "vee-validate";
import TextInput from "_components/atoms/text-input.vue";

type Props = {
  id?: string;
  name: string;
  type?: HTMLInputElement["type"];
  placeholder?: HTMLInputElement["placeholder"];
  value?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  value: "",
  type: "text",
});

const {
  value: fieldValue,
  meta,
  errorMessage,
} = useField(props.name, undefined, {
  initialValue: String(props.value),
});
</script>

<template>
  <TextInput
    :id="$attrs.id ?? name"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :has-error="Boolean(errorMessage) && !meta.valid"
    v-model="fieldValue"
  />
</template>
