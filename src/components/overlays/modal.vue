<script setup lang="ts">
import { Dialog, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/outline";
import Button from "_components/atoms/button.vue";
import OverlayBackdrop from "_components/overlays/overlay-backdrop.vue";

type Props = {
  open?: boolean;
  title?: string;
  text?: string;
  layout?: "simple" | "centered" | "centered-wide";
  showIcon?: boolean;
  iconType?: "info" | "warning" | "success" | "error";
  iconVariant?: "info" | "warning" | "success" | "error";
  confirmButtonLabel?: string;
  confirmButtonVariant?: "simple" | "cta" | "positive" | "negative";
  cancelButtonLabel?: string;
  cancelButtonVariant?: "simple" | "cta" | "positive" | "negative";
};

withDefaults(defineProps<Props>(), {
  showIcon: true,
  layout: "simple",
  confirmButtonLabel: "Confirm",
  confirmButtonVariant: "cta",
});

type Emits = {
  (e: "close"): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
};

const emit = defineEmits<Emits>();

function onClose() {
  emit("close");
}

function onConfirm() {
  emit("confirm");
}

function onCancel() {
  emit("cancel");
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="modal-layer" @close="onClose">
      <div class="modal-container">
        <OverlayBackdrop />

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="modal-center-helper" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            :class="{
              modal: true,
              'modal--simple': layout === 'simple',
              'modal--centered': layout === 'centered' || layout === 'centered-wide',
              'modal--wide': layout === 'centered-wide',
            }"
          >
            <div class="modal__body">
              <div v-if="showIcon" class="modal__icon">
                <CheckIcon class="modal__icon__svg" aria-hidden="true" />
              </div>
              <div class="modal__content">
                <DialogTitle as="h3" class="modal__content__title">{{ title }}</DialogTitle>
                <p class="modal__content__text">{{ text }}</p>
              </div>
            </div>
            <div class="modal__actions">
              <slot name="modal-actions">
                <Button
                  v-if="confirmButtonLabel"
                  :variant="confirmButtonVariant"
                  @click="onConfirm"
                >
                  {{ confirmButtonLabel }}
                </Button>
                <Button
                  v-if="cancelButtonLabel"
                  :variant="cancelButtonVariant"
                  @click="onCancel"
                >
                  {{ cancelButtonLabel }}
                </Button>
              </slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="postcss">
.modal-layer {
  @apply fixed inset-0 z-10 overflow-y-auto;
}

.modal-container {
  @apply flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0;
}

.modal-center-helper {
  @apply hidden sm:inline-block sm:h-screen sm:align-middle;
}

.modal {
  @apply inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle;

  &--centered {
    @apply px-4 pt-5 pb-4 sm:max-w-sm sm:p-6;
  }

  &--simple,
  &--wide {
    @apply sm:max-w-lg;
  }

  /*
   * modal__body
   */

  &--simple &__body {
    @apply px-4 pt-5  pb-4 sm:flex sm:items-start sm:p-6 sm:pb-4;
  }

  /*
   * modal__icon
   */

  &__icon {
    @apply mx-auto flex h-12 w-12 items-center justify-center rounded-full;
    @apply bg-green-100 text-green-600;

    &__svg {
      @apply h-6 w-6;
    }
  }

  &--simple &__icon {
    @apply flex-shrink-0 sm:mx-0 sm:h-10 sm:w-10;
  }

  /*
   * modal__content
   */

  &__content {
    @apply text-center;

    &__title {
      @apply text-lg font-medium leading-6 text-gray-900;
    }

    &__text {
      @apply mt-2 text-sm text-gray-500;
    }
  }

  &__icon + &__content {
    @apply mt-3 sm:mt-5;
  }

  &--simple &__content {
    @apply sm:mt-0 sm:text-left;
  }

  &--simple &__icon + &__content {
    @apply sm:ml-4;
  }

  /*
   * modal__actions
   */

  &__actions {
    > .button {
      @apply mt-3 w-full sm:mt-0;

      &:first-child {
        @apply mt-0;
      }

      &:first-child:last-child {
        @apply mt-0;
      }
    }
  }

  &--simple &__actions {
    @apply sm:flex sm:flex-row-reverse;
    @apply bg-gray-50 px-4 py-3 sm:px-6;

    > .button {
      @apply mr-0 sm:mr-3 sm:w-auto;

      &:first-child {
        @apply sm:mr-0;
      }
    }
  }

  &--centered &__actions {
    @apply mt-5 sm:mt-6;
    @apply sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3;

    > .button {
      &:first-child {
        @apply sm:col-start-2;
      }

      &:last-child {
        @apply sm:col-start-1;
      }

      &:first-child:last-child {
        @apply sm:col-span-2;
      }
    }
  }
}
</style>
