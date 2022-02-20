<script setup lang="ts">
import { computed } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/solid";

type Emits = {
  (e: "update:modelValue", value: string): void;
};

type Props = {
  modelValue?: string;
  hasError?: boolean;
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();


const value = computed({
  get: () => props.modelValue ?? "",
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<script lang="ts">
export default { name: "SelectControl", inheritAttrs: false };
</script>

<template>
  <div :class="{ 'select-control': true, 'select-control--has-error': hasError }">
    <select
      class="select-control__control"
      v-bind="$attrs"
      v-model="value"
      :aria-invalid="hasError"
      :aria-describedby="`${$attrs.id || $attrs.name}-error`"
    >
      <slot></slot>
    </select>
    <div v-if="hasError" class="select-control__icon-wrapper">
      <slot name="errorIcon">
        <ExclamationCircleIcon class="select-control__icon" aria-hidden="true" />
      </slot>
    </div>
  </div>
</template>

<style lang="postcss">
.select-control {
  @apply relative rounded-md shadow-sm;

  &__control {
    @apply block w-full rounded-md sm:text-sm;
    @apply py-2 pl-3 pr-10 text-base;
    @apply border-gray-300 text-gray-900 placeholder-gray-400;
    @apply focus:border-indigo-500 focus:ring-indigo-500;
  }

  &__icon-wrapper {
    @apply pointer-events-none absolute inset-y-0 right-0 flex items-center pr-10;
  }

  &__icon {
    @apply h-5 w-5;
  }

  &--has-error &__control {
    @apply border-red-300 text-red-900 placeholder-red-400;
    @apply focus:border-red-500 focus:ring-red-500;
  }

  &--has-error &__control {
    @apply pr-20;
  }

  &--has-error &__icon {
    @apply text-red-500;
  }
}
</style>
