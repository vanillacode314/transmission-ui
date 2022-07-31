<script setup lang="ts">
import { storeToRefs } from "pinia";

const store = useStore();
const { host, port, user, pass } = storeToRefs(store);
const { notify } = useNotifications();
function onSubmit() {
  notify("success", "Setings Saved Successfully");
  navigateTo("/");
}
</script>

<template>
  <div
    class="p-5 dark:bg-gray-900 dark:text-white flex gap-5 h-screen grid-cols-[auto,1fr] grid"
  >
    <Sidebar />
    <div class="grid">
      <form @submit.prevent="onSubmit" class="bg-gray-800 p-5 rounded">
        <div class="mb-6">
          <label
            for="host"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Host</label
          >
          <input
            type="text"
            id="host"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="localhost"
            v-model="host"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="port"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Port</label
          >
          <input
            type="number"
            id="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="9091"
            v-model="port"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="user"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >User</label
          >
          <input
            type="text"
            id="user"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="user"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="pass"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Password</label
          >
          <input
            type="password"
            id="pass"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="pass"
            required
          />
        </div>
        <div class="flex gap-3">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>
          <input
            type="reset"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          />
        </div>
      </form>
    </div>
  </div>
</template>
