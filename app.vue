<script setup lang="ts">
onBeforeMount(() => {
  document.documentElement.classList.add("dark");
});
</script>
<template>
  <div class="max-h-screen overflow-hidden">
    <NuxtPage />
  </div>
  <Notifications />
</template>
<style lang="postcss">
*::-webkit-scrollbar {
  width: 0.3rem;
}

*::-webkit-scrollbar-track {
  @apply bg-gray-500;
}

*::-webkit-scrollbar-thumb {
  @apply bg-gray-200;
}
</style>
