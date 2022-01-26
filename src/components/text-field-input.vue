<script lang="ts">
import { defineComponent } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/solid";

export default defineComponent({
  inheritAttrs: false,
  props: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      default: "text",
      type: String,
    },
    modelValue: [String, Number],
    hasError: {
      default: false,
      type: Boolean
    },
    errorIcon: {
      type: Object,
      default: ExclamationCircleIcon,
    }
  },
  emits: {
    'update:modelValue': String
  },
  methods: {
    handleUpdate(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    }
  },
  components: { ExclamationCircleIcon }
})

</script>

<template>
  <div class="relative rounded-md shadow-sm">
    <input
      :id="id"
      :name="name"
      :type="type"
      v-bind="$attrs"
      v-bind:value="modelValue"
      v-on:input="handleUpdate"
      class="block w-full pr-10 sm:text-sm rounded-md"
      :class="{
        'border-gray-300': !hasError,
        'text-red-900': !hasError,
        'placeholder-gray-400': !hasError,
        'focus:ring-indigo-500': !hasError,
        'focus:border-indigo-500': !hasError,
        'border-red-300': hasError,
        'text-red-900': hasError,
        'placeholder-red-300': hasError,
        'focus:ring-red-500': hasError,
        'focus:border-red-500': hasError,
      }"
      :aria-invalid="hasError"
      :aria-describedby="`${id ?? name}-error`"
    />
    <div
      v-if="hasError"
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
    >
      <component :is="errorIcon" class="h-5 w-5 text-red-500" aria-hidden="true" />
    </div>
  </div>
</template>