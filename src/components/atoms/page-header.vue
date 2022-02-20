<style lang="postcss"></style>

<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
        {{ title }}
      </h2>
    </div>
    <div class="mt-4 flex md:mt-0 md:ml-4">
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
