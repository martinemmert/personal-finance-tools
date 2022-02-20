<script setup lang="ts">
type Props = {
  variant?: "default" | "negative" | "positive";
};

withDefaults(defineProps<Props>(), {
  variant: "default",
});
</script>

<template>
  <p
    :class="{
      'text-input-message': true,
      'text-input-message--negative': variant === 'negative',
      'text-input-message--positive': variant === 'positive',
    }"
  >
    <slot />
  </p>
</template>

<style lang="postcss">
.text-input-message {
  @apply text-sm;
  @apply text-gray-500;

  &--negative {
    @apply text-red-600;
  }

  &--positive {
    @apply text-green-600;
  }
}
</style>
