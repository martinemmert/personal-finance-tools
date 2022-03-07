<template>
  <div class="min-h-full">
    <Header />
    <div class="py-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "_components/header.vue";
</script>
