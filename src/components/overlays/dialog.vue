<script setup lang="ts">
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import Button from "_components/atoms/button.vue";
import OverlayBackdrop from "_components/overlays/overlay-backdrop.vue";

type Props = {
  open?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
};

withDefaults(defineProps<Props>(), {});

type Emits = {
  (e: "close"): void;
};

const emit = defineEmits<Emits>();

function onClose() {
  emit("close");
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="dialog-layer" @close="onClose">
      <div class="dialog-container">
        <OverlayBackdrop />

        <!-- This element is to trick the browser into centering the dialog contents. -->
        <span class="dialog-center-helper" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-200 delay-50"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div class="dialog">
            <DialogTitle v-if="title" class="sr-only">{{ title }}</DialogTitle>
            <DialogDescription v-if="description" class="sr-only">
              {{ description }}
            </DialogDescription>
            <div v-if="showCloseButton" class="dialog__close-button-container">
              <button type="button" class="dialog__close-button" @click="onClose">
                <span class="sr-only">Close</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="dialog__content">
              <slot></slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="postcss">
.dialog-layer {
  @apply fixed inset-0 z-10 overflow-y-auto;
}

.dialog-container {
  @apply flex min-h-screen items-stretch justify-start pt-8 text-center sm:block;
  @apply sm:mx-8 sm:p-0;
}

.dialog-center-helper {
  @apply hidden sm:inline-block sm:h-screen sm:align-middle;
}

.dialog {
  @apply block w-full transform overflow-hidden bg-white text-left align-bottom shadow-xl transition-all;
  @apply sm:my-8 sm:inline-block sm:max-w-4xl sm:rounded-lg sm:p-8 sm:align-middle;

  &__close-button-container {
    @apply absolute top-0 right-0 hidden pt-4 pr-4 sm:block;
  }

  &__close-button {
    @apply rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
  }

  &__content {
    @apply sm:-m-8;
  }
}
</style>
