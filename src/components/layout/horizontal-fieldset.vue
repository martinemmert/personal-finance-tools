<template>
  <fieldset class="horizontal-fieldset">
    <div>
      <slot name="label"></slot>
      <slot name="hint"></slot>
    </div>
    <div class="mt-1 sm:col-span-2 sm:mt-0">
      <slot></slot>
      <div v-if="$slots.message" class="horizontal-fieldset__message">
        <slot name="message"></slot>
      </div>
    </div>
  </fieldset>
</template>

<style lang="postcss">
.horizontal-fieldset {
  @apply sm:grid sm:grid-cols-3 sm:items-start sm:gap-4;

  .label {
    @apply sm:pt-3;
  }

  &__message:not(:empty) {
    @apply mt-1;
  }
}
</style>
