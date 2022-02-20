<template>
  <th scope="col" class="th">
    <slot></slot>
  </th>
</template>

<style lang="postcss">
.th {
  @apply px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500;
}
</style>
