<template>
  <span>
    <span>{{ formattedValue }}</span>
    <span>&nbsp;{{ symbol }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    symbol: {
      type: String,
      default: "EUR"
    }
  },
  computed: {
    formattedValue() {
      return parseFloat(`${this.value}`).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
  }
})
</script>