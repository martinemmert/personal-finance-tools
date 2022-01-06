<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import CurrencyDisplay from "../../components/currency-display.vue";
import DateDisplay from "../../components/date-display.vue";
import { DELETE_SUBSCRIPTION, LOAD_SUBSCRIPTIONS } from "../../store/mutation-types";

export default defineComponent({
  components: {
    CurrencyDisplay,
    DateDisplay,
    RouterView,
  },
  created() {
    this.$store.dispatch({ type: LOAD_SUBSCRIPTIONS })
  },
  computed: {
    subscriptions() {
      return this.$store.state.subscriptions.data;
    }
  },
  methods: {
    deleteItem(id: string) {
      const item = this.$store.getters.getSubscription(id);
      if (!item) return;
      const msg = `Do you really want to delete '${item.name}' from your list?`
      if (window.confirm(msg)) this.$store.dispatch({ type: DELETE_SUBSCRIPTION, id })
    },
    navigateTo(path: string) {
      this.$router.push(path);
    }
  }
});

</script>

<template>
  <header class="flex flex-row justify-between items-center p-4">
    <h1 class="text-3xl font-bold">Subscriptions</h1>
    <button class="btn btn-primary" @click="navigateTo('/create')">Add new item</button>
  </header>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Start Date</th>
        <th class="text-right">Fee</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="subscription in subscriptions">
        <td>
          <span class="font-bold">{{ subscription.name }}</span>
        </td>
        <td>
          <DateDisplay date-style="short" :value="subscription.start_date" />
        </td>
        <td class="text-right">
          <CurrencyDisplay :value="subscription.fee" />
        </td>
        <td class="flex justify-end">
          <button
            class="btn btn-xs btn-square btn-outline border-0 btn-info mr-2"
            @click="navigateTo('/edit/' + subscription.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
          </button>
          <button
            class="btn btn-xs btn-square btn-outline border-0 btn-info mr-2"
            @click="deleteItem(subscription.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <RouterView name="form" @formSubmitted="navigateTo('/')" @formCancelled="navigateTo('/')" />
</template>
