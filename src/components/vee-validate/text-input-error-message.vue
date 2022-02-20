<script setup lang="ts">
import { useFieldError } from "vee-validate";
import TextInputMessage from "_components/atoms/text-input-message.vue";

type Props = {
  name: string;
};

const props = defineProps<Props>();
const errorMessage = useFieldError(props.name);
</script>

<template>
  <TextInputMessage v-if="errorMessage" variant="negative">
    {{ errorMessage }}
  </TextInputMessage>
</template>
