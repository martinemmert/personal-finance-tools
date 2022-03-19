<script setup lang="ts">
import Table from "_components/atoms/table";
import Button from "_components/atoms/button.vue";
import { ServiceSubscription } from "_modules/service-subscriptions/store";

type Emits = {
  (e: "edit", id: string): void;
  (e: "delete", id: string): void;
};

type Props = {
  data: ServiceSubscription[];
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<template>
  <table class="w-full">
    <Table.thead class="bg-gray-50">
      <Table.tr>
        <Table.th>Name</Table.th>
        <Table.th>Subscription plan</Table.th>
        <Table.th>Billing period</Table.th>
        <Table.th>Price</Table.th>
        <Table.th>
          <span class="sr-only">Actions</span>
        </Table.th>
      </Table.tr>
    </Table.thead>
    <Table.tbody>
      <Table.tr v-for="item in props.data" :key="item.id">
        <Table.td>{{ item.service_name }}</Table.td>
        <Table.td>{{ item.subscription_plan }}</Table.td>
        <Table.td>{{ item.billing_period }}</Table.td>
        <Table.td>{{ item.subscription_fee }}</Table.td>
        <Table.td class="space-x-2 text-right">
          <Button @click="emit('edit', item.id)" size="xs" rounded>Edit</Button>
          <Button @click="emit('delete', item.id)" size="xs" rounded>Delete</Button>
        </Table.td>
      </Table.tr>
    </Table.tbody>
  </table>
</template>
