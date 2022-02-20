<template>
  <div class="form-actions">
    <slot></slot>
  </div>
</template>

<style lang="postcss">
.form-actions {
  @apply flex flex-col-reverse bg-gray-50 px-4 py-3;
  @apply sm:flex-row sm:justify-end sm:space-x-3 sm:px-6;

  & > .button {
    @apply mt-3 sm:mt-0;

    &:last-child {
      @apply mt-0;
    }
  }
}
</style>
