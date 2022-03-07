<template>
  <div class="min-h-full">
    <nav class="mx-auto bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      <div class="flex h-16 max-w-6xl items-center justify-end">
        <Button @click="logout">Sign Out</Button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import Button from "_components/atoms/button.vue";
import { useAuthStore } from "_modules/auth/hooks/use-auth-store";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

async function logout() {
  await store.supabase.auth.signOut();
  await router.replace("/login");
}
</script>
