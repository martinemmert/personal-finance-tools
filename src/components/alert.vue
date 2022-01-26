<script lang="ts">
import { XCircleIcon, InformationCircleIcon, CheckCircleIcon, ExclamationIcon } from '@heroicons/vue/solid'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  components: {
    XCircleIcon,
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationIcon
  },
  computed: {
    currentIconComponent() {
      switch (this.$props.variant) {
        case "info":
          return InformationCircleIcon;
        case "warning":
          return ExclamationIcon;
        case "error":
          return XCircleIcon;
        case "success":
          return CheckCircleIcon;
      }
    }
  },
  props: {
    message: String,
    variant: {
      type: String as PropType<"success" | "warning" | "error" | "info">,
      default: "info",
      validator: (value: string) => {
        return ["success", "warning", "error", "info"].includes(value);
      }
    }
  }
})
</script>

<template>
  <div
    class="rounded-md p-4"
    :class="{
      'bg-blue-50': variant === 'info',
      'bg-yellow-50': variant === 'warning',
      'bg-red-50': variant === 'error',
      'bg-green-50': variant === 'success',
    }"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <component
          :is="currentIconComponent"
          class="h-5 w-5"
          :class="{
            'text-blue-400': variant === 'info',
            'text-yellow-400': variant === 'warning',
            'text-red-400': variant === 'error',
            'text-green-400': variant === 'success',
          }"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3
          class="text-sm font-medium"
          :class="{
            'text-blue-800': variant === 'info',
            'text-yellow-800': variant === 'warning',
            'text-red-800': variant === 'error',
            'text-green-800': variant === 'success',
          }"
        >{{ message }}</h3>
        <div
          class="mt-2 text-sm"
          :class="{
            'text-blue-700': variant === 'info',
            'text-yellow-700': variant === 'warning',
            'text-red-700': variant === 'error',
            'text-green-700': variant === 'success',
          }"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
