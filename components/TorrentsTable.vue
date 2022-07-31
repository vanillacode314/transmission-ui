<script setup lang="ts">
import type { Ref } from "vue";
export interface Torrent {
  id: number;
  name: string;
  sizeWhenDone: number;
  percentDone: number;
  status: number;
  rateUpload: number;
  rateDownload: number;
}
import { storeToRefs } from "pinia";

const store = useStore();
const { runMethod, getID } = store;
const { filters } = storeToRefs(store);
const { notify } = useNotifications();

const { formatBytes, round } = useUtils();

let data: Ref<{ torrents: Torrent[] }> = ref({ torrents: [] });

async function getTorrents() {
  try {
    data.value = await runMethod("torrent-get", {
      fields: [
        "id",
        "name",
        "sizeWhenDone",
        "percentDone",
        "status",
        "rateUpload",
        "rateDownload",
      ],
    });
    setTimeout(getTorrents, 500);
  } catch {
    await navigateTo("/settings");
    notify("error", "Incorrect Settings");
  }
}

await getID();
await getTorrents();

const statusMap = {
  0: "Stopped",
  1: "Queued for verifying local data",
  2: "Verifying local data",
  3: "Queued for downloading",
  4: "Downloading",
  5: "Queued for seeding",
  6: "Seeding",
};

const fields = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "progress",
    label: "Progress",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "downloadRate",
    label: "Down",
  },
  {
    key: "uploadRate",
    label: "Up",
  },
];

const torrents = computed(() => data.value.torrents);
const items = computed(() =>
  torrents.value.map((t) => ({
    id: t.id,
    name: t.name,
    size: t.sizeWhenDone,
    progress: t.percentDone,
    status: t.status,
    downloadRate: t.rateDownload,
    uploadRate: t.rateUpload,
  }))
);

async function onClick(torrent: Torrent) {
  if (torrent.status === 0) {
    await runMethod("torrent-start", {
      ids: [torrent.id],
    });
  } else {
    await runMethod("torrent-stop", {
      ids: [torrent.id],
    });
  }
}
</script>
<template>
  <div class="overflow-auto w-full">
    <BaseTable
      :fields="fields"
      :items="items"
      :filterFuncs="filters"
      :onClick="onClick"
    >
      <template #cell(progress)="{ value }">
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            class="text-xs font-medium text-center p-0.5 leading-none rounded-full"
            :class="{
              'bg-blue-600': value < 1,
              'text-blue-100': value < 1,
              'text-green-100': value === 1,
              'bg-green-600': value === 1,
            }"
            :style="{ width: `${value * 100}%` }"
          >
            {{ round(value * 100) }}%
          </div>
        </div>
      </template>
      <template #cell(downloadRate)="{ value }">
        <div
          class="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase"
        >
          {{ formatBytes(value) }}/s
        </div>
      </template>
      <template #cell(uploadRate)="{ value }">
        <div
          class="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase"
        >
          {{ formatBytes(value) }}/s
        </div>
      </template>
      <template #cell(size)="{ value }">
        <div
          class="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase"
        >
          {{ formatBytes(value) }}
        </div>
      </template>
      <template #cell(status)="{ value }">
        <div
          class="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase"
        >
          {{ statusMap[value] }}
        </div>
      </template>
    </BaseTable>
  </div>
</template>
