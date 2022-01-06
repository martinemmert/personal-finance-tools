<template>
  <span>
    <span>{{ formattedValue }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    value: {
      type: [String, Date],
      default: new Date(),
    },
    dateStyle: {
      type: String as PropType<"medium" | "full" | "long" | "short">,
      default: "medium",
      validator: (value: string) => {
        return ["medium", "full", "long", "short"].includes(value);
      }
    }
  },
  computed: {
    formattedValue() {
      const now = typeof this.value === "string" ? new Date(this.value) : this.value;
      return now.toLocaleDateString(undefined, { dateStyle: this.dateStyle })
    }
  }
})
</script>