<script setup lang="ts">
type Props = { text?: string };
defineProps<Props>();
</script>

<template>
  <label class="label">
    <slot>
      {{ text }}
    </slot>
  </label>
</template>

<style lang="postcss">
.label {
  @apply block text-sm font-medium text-gray-700;
}
</style>
