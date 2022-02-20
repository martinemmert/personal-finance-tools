<script setup lang="ts">
import Spinner from "_components/atoms/spinner.vue";
type Props = {
  type?: "button" | "submit" | "reset";
  variant?: "cta" | "simple" | "negative" | "positive";
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  rounded?: boolean,
  loading?: boolean;
};

withDefaults(defineProps<Props>(), {
  type: "button",
  size: "md",
  variant: "simple",
});
</script>

<template>
  <button
    :type="type"
    :class="{
      button: true,
      'button--cta': variant === 'cta',
      'button--simple': variant === 'simple',
      'button--negative': variant === 'negative',
      'button--positive': variant === 'positive',
      'button--size-xs': size === 'xs',
      'button--size-sm': size === 'sm',
      'button--size-md': size === 'md',
      'button--size-lg': size === 'lg',
      'button--size-xl': size === 'xl',
      'button--rounded': rounded,
      'button--loading': loading,
    }"
  >
    <Spinner v-if="loading" class="-ml-1 mr-3" />
    <slot></slot>
  </button>
</template>

<style lang="postcss">
.button {
  @apply inline-flex items-center justify-center rounded-md border font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2;
  @apply disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-gray-100;

  &--size-xs {
    @apply px-3 py-1.5 text-xs;
  }

  &--size-sm {
    @apply px-3.5 py-2 text-sm leading-4;
  }

  &--size-md {
    @apply px-4 py-2 text-sm;
  }

  &--size-lg {
    @apply px-5 py-2 text-sm;
  }

  &--size-xl {
    @apply px-6 py-3 text-sm;
  }

  &--cta {
    @apply border-transparent;
    @apply bg-indigo-600 text-white hover:bg-indigo-700;
    @apply focus:ring-indigo-500;
  }

  &--simple {
    @apply border-gray-300;
    @apply bg-white text-gray-700 hover:bg-gray-50;
    @apply focus:ring-gray-500;
  }

  &--negative {
    @apply border-transparent;
    @apply bg-red-600 text-white hover:bg-red-700;
    @apply focus:ring-red-500;
  }

  &--positive {
    @apply border-transparent;
    @apply bg-green-600 text-white hover:bg-green-700;
    @apply focus:ring-green-500;
  }

  &--rounded {
    @apply rounded-full;
  }

  &--loading {
    @apply cursor-not-allowed;
  }
}
</style>
