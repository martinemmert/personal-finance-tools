<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    hasError: {
      type: Boolean,
      default: false,
    }
  }
})
</script>

<template>
  <p
    class="mt-2 text-sm"
    :class="{
      'text-gray-500': !hasError,
      'text-red-600': hasError
    }"
  >
    <slot />
  </p>
</template>