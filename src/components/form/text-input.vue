<template>
  <input
    :type="type"
    class="input"
    v-bind:class="{
      'input-bordered': !borderless,
      'input-ghost': ghost,
    }"
    v-bind:value="modelValue"
    v-on:input="handleUpdate"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: {
      default: "text",
      type: String,
    },
    modelValue: [String, Number],
    borderless: {
      default: false,
      type: Boolean,
    },
    ghost: Boolean,
  },
  emits: {
    'update:modelValue': String
  },
  methods: {
    handleUpdate(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    }
  }
})

</script>
