<style lang="postcss">
.card-header {
  @apply border-b border-gray-200 bg-white px-4 py-5 sm:px-6;

  &__title {
    @apply text-lg font-medium leading-6 text-gray-900;
  }
}
</style>

<template>
  <div class="card-header">
    <h3 class="card-header__title">
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>
