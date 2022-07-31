<script setup lang="ts">
import { PropType } from "vue";
const props = defineProps({
  kind: {
    type: String as PropType<"success" | "warn" | "error">,
    default: "success",
  },
});
</script>

<template>
  <div
    class="flex items-center p-2 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800 ring gap-2"
    role="alert"
  >
    <div
      class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 rounded-lg dark:text-green-200"
      :class="{
        'bg-green-100 dark:bg-green-800': kind === 'success',
        'bg-yellow-100 dark:bg-yellow-800': kind === 'warn',
        'bg-red-100 dark:bg-red-800': kind === 'error',
      }"
    >
      <span
        :class="{
          'i-mdi-check': kind === 'success',
          'i-mdi-alert': kind === 'warn',
          'i-mdi-close': kind === 'error',
        }"
      ></span>
      <span class="sr-only">Check icon</span>
    </div>
    <div class="text-sm font-normal"><slot /></div>
    <!-- <button -->
    <!--   type="button" -->
    <!--   class="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 inline-flex p-1 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" -->
    <!--   aria-label="Close" -->
    <!-- > -->
    <!--   <span class="sr-only">Close</span> -->
    <!--   <span class="i-mdi-close"></span> -->
    <!-- </button> -->
  </div>
</template>
