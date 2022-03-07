<script setup type="ts">
import Spinner from "_components/atoms/spinner.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {useAuthStore} from "_modules/auth/hooks/use-auth-store";
import {useRoute, useRouter} from "vue-router";
import {useRefreshSession} from "_modules/auth/hooks/use-refresh-session";

let ellipsisTimer;
const ellipsis = ref("...")
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const {referer} = route.query;
const refreshSession = useRefreshSession();

onMounted(async () => {
  ellipsisTimer = setInterval(() => {
    ellipsis.value = ellipsis.value.length > 3 ? "." : `${ellipsis.value}.`;
  }, 200);

  const userIsAuthenticated = await refreshSession();

  if (userIsAuthenticated) {
    console.log("Session detected, redirecting.");
    await router.push(referer ?? "/");
  } else {
    console.log("No session detected, redirecting.");
    await router.push({name: "auth-login"});
  }
});

onUnmounted(() => {
  clearInterval(ellipsisTimer);
});
</script>

<template>
  <div class="flex h-full items-center justify-center">
    <div class="flex items-center justify-center">
      <Spinner class="text-indigo-600" />
      <p class="ml-2 text-sm text-gray-600">
        <span>Trying to log you in</span>
        <span class="ml-1 inline-block w-5">{{ ellipsis }}</span>
      </p>
    </div>
  </div>
</template>
