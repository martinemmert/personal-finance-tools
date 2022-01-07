<script lang="ts">
import { XCircleIcon } from '@heroicons/vue/solid'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    XCircleIcon,
  },
  props: {
    message: String,
  }
})
</script>

<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">{{ message }}</h3>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
