<script setup lang="ts">
import { useField } from "vee-validate";
import TextInput from "_components/atoms/text-input.vue";
import SelectControl from "../atoms/select-control.vue";

type Props = {
  id?: string;
  name: string;
  value?: string;
};

const props = withDefaults(defineProps<Props>(), {
  value: "",
});

const {
  value: fieldValue,
  meta,
  errorMessage,
} = useField(props.name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <SelectControl
    :id="$attrs.id ?? name"
    :name="name"
    :has-error="Boolean(errorMessage) && !meta.valid"
    v-model="fieldValue"
  >
    <slot></slot>
  </SelectControl>
</template>
