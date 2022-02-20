<style lang="postcss">
.section-header {
  @apply border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between;

  &__title {
    @apply text-lg font-medium leading-6 text-gray-900;
  }

  &__actions {
    @apply mt-3 flex sm:mt-0 sm:ml-4;
  }
}
</style>

<template>
  <div class="section-header">
    <h3 class="section-header__title">{{ title }}</h3>
    <div class="section-header__actions">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
};

defineProps<Props>();
</script>
