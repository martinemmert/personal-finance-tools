<style lang="postcss"></style>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useLink, useRoute, useRouter } from "vue-router";
import Button from "_components/atoms/button.vue";
import PageHeader from "_components/atoms/page-header.vue";
import Dialog from "_components/overlays/dialog.vue";
import EditForm from "./edit-form.vue";
import TableView from "./table-view.vue";
import Modal from "_components/overlays/modal.vue";
import { useServiceSubscriptions } from "_modules/service-subscriptions/store";
import { storeToRefs } from "pinia";

const store = useServiceSubscriptions();
const { items } = storeToRefs(store);

onMounted(() => {
  store.fetch();
});

const router = useRouter();
const currentRoute = useRoute();
const baseLink = useLink({ to: "/" });
const createLink = useLink({ to: "/create" });

const deleteModalOpen = ref(false);

const dialogOpen = computed(() => {
  return (
    currentRoute.name === "edit-subscription-service" ||
    currentRoute.name === "create-subscription-service"
  );
});

function onEdit(id: string) {
  router.push(`/edit/${id}`);
}

function onDelete(id: string) {
  deleteModalOpen.value = true;
}
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-6 pt-6 sm:px-6 lg:px-8">
    <PageHeader title="Service Subscriptions">
      <Button variant="cta" @click="createLink.navigate">Add subscription</Button>
    </PageHeader>
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <TableView v-if="items && items.length > 0" :data="items" @edit="onEdit" @delete="onDelete" />
      <div v-if="!items || items.length === 0" class="mx-auto my-8 max-w-xl">
        <button
          type="button"
          class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
            />
          </svg>
          <span class="mt-2 block text-sm font-medium text-gray-900">
            Add a new service subscription
          </span>
        </button>
      </div>
    </div>
  </div>
  <Modal
    :open="deleteModalOpen"
    title="Do you really want to delete X?"
    text="This action can't be reverted"
    icon-variant="warning"
    confirm-button-label="YES"
    confirm-button-variant="negative"
    cancel-button-label="NO"
    @confirm="deleteModalOpen = false"
    @cancel="deleteModalOpen = false"
  />
  <Dialog :open="dialogOpen" @close="baseLink.navigate">
    <EditForm @submitted="baseLink.navigate" @cancel="baseLink.navigate" />
  </Dialog>
</template>