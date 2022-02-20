<script setup lang="ts">
type Props = {
  title: string;
  subtitle?: string;
};

defineProps<Props>();
</script>

<template>
  <div class="form-header">
    <h3 class="form-header__title">{{ title }}</h3>
    <p v-if="subtitle" class="form-header__subtitle">
      {{ subtitle }}
    </p>
  </div>
</template>

<style lang="postcss">
.form-header {
  &__title {
    @apply text-lg font-medium leading-6 text-gray-900;
  }

  &__subtitle {
    @apply mt-1 max-w-2xl text-sm text-gray-500;
  }
}
</style>
