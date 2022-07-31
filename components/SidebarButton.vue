<script setup lang="ts">
interface Props {
  icon?: string;
  label: string;
  href?: string;
}

defineProps<Props>();
</script>
<template>
  <template v-if="href">
    <NuxtLink
      class="flex items-center p-2 text-xs font-medium uppercase text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full outline-none"
      :to="href"
    >
      <div :class="`${icon} text-sm`" v-if="icon"></div>
      <span class="ml-3">{{ label }}</span>
    </NuxtLink>
  </template>
  <template v-else>
    <button
      class="flex items-center p-2 text-xs font-medium uppercase text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full outline-none"
      @click="$emit('click')"
    >
      <div :class="`${icon} text-sm`" v-if="icon"></div>
      <span class="ml-3">{{ label }}</span>
    </button>
  </template>
</template>
