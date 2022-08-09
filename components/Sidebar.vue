<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FilterFunc } from "./base/Table.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { filters } = storeToRefs(store);
const { runMethod } = store;
let currentFilter: FilterFunc = null;
let filesInput = ref<HTMLInputElement>(null);

function setFilter(status: number) {
  if (route.path !== "/") router.push({ path: "/" });
  filters.value = filters.value.filter((item) => item !== currentFilter);
  if (status > -1) {
    currentFilter = (item) => item.status === status;
    asdf;
    adsf;
    asdf;
    filters.value.push(currentFilter);
  } else {
    currentFilter = null;
  }
}

function addFile() {
  filesInput.value.click();
}

async function addMagnet() {
  const p = prompt("Enter magnet: ");
  if (p) {
    await runMethod("torrent-add", {
      filename: p,
    });
  }
}

function handleFiles(e: Event) {
  const inp = e.target as HTMLInputElement;
  const file = inp.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataString = reader.result as string;
      const [_, base64String] = dataString.split(",");
      await runMethod("torrent-add", {
        metainfo: base64String,
      });
    };
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <aside class="w-64 h-full" aria-label="Sidebar">
    <div
      class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full"
    >
      <ul class="space-y-2">
        <li>
          <SidebarButton
            icon="i-mdi-plus"
            label="Add File"
            @click="addFile()"
          />
          <SidebarButton
            icon="i-mdi-link"
            label="Add Magnet"
            @click="addMagnet()"
          />
        </li>
      </ul>
      <ul
        class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
      >
        <li>
          <SidebarButton icon="i-mdi-grid" label="All" @click="setFilter(-1)" />
        </li>
        <li>
          <SidebarButton
            icon="i-mdi-pause"
            label="Stopped"
            @click="setFilter(0)"
          />
        </li>
        <li>
          <SidebarButton
            icon="i-mdi-download"
            label="Downloading"
            @click="setFilter(4)"
          />
        </li>
        <li>
          <SidebarButton
            icon="i-mdi-upload"
            label="Seeding"
            @click="setFilter(6)"
          />
        </li>
      </ul>
      <ul
        class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
      >
        <li>
          <SidebarButton icon="i-mdi-gear" label="Settings" href="/settings" />
        </li>
      </ul>
    </div>
    <input
      class="hidden"
      type="file"
      ref="filesInput"
      @change="handleFiles"
      accept="application/x-bittorrent,.torrent"
    />
  </aside>
</template>
