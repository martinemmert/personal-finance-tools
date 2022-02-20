<script setup lang="ts">
import { computed } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/solid";

type Emits = {
  (e: "update:modelValue", value: string): void;
};

type Props = {
  type?: HTMLInputElement["type"];
  modelValue?: string | number;
  hasError?: boolean;
};

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const value = computed({
  get: () => String(props.modelValue ?? ""),
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<script lang="ts">
export default { name: "TextInput", inheritAttrs: false };
</script>

<template>
  <div :class="{ 'text-input': true, 'text-input--has-error': hasError }">
    <input
      class="text-input__control"
      v-bind="$attrs"
      v-model="value"
      :type="type"
      :aria-invalid="hasError"
      :aria-describedby="`${$attrs.id || $attrs.name}-error`"
    />
    <div v-if="hasError" class="text-input__icon-wrapper">
      <slot name="errorIcon">
        <ExclamationCircleIcon class="text-input__icon" aria-hidden="true" />
      </slot>
    </div>
  </div>
</template>

<style lang="postcss">
.text-input {
  @apply relative rounded-md shadow-sm;

  &__control {
    @apply block w-full rounded-md sm:text-sm;
    @apply py-2 pl-3 pr-10 text-base;
    @apply border-gray-300 text-gray-900 placeholder-gray-400;
    @apply focus:border-indigo-500 focus:ring-indigo-500;
  }

  &__icon-wrapper {
    @apply pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3;
  }

  &__icon {
    @apply h-5 w-5;
  }

  &--has-error &__control {
    @apply border-red-300 text-red-900 placeholder-red-400;
    @apply focus:border-red-500 focus:ring-red-500;
  }

  &--has-error &__control {
    @apply pr-10;
  }

  &--has-error &__icon {
    @apply text-red-500;
  }
}
</style>
