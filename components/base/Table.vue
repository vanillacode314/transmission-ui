<script setup lang="ts">
export type FilterFunc = (item: TableItem) => boolean;
export interface TableField {
  key: string;
  label: string;
}
export interface TableItem {
  id: number;
  [key: string]: any;
}

import { PropType } from "vue";

const props = defineProps({
  name: {
    type: String,
  },
  fields: {
    type: Array as PropType<TableField[]>,
    default: () => [],
  },
  items: {
    type: Array as PropType<TableItem[]>,
    default: () => [],
  },
  filterFuncs: {
    type: Array as PropType<FilterFunc[]>,
    default: [],
  },
  onClick: {
    type: Function as PropType<(item: TableItem) => any>,
    default: () => {},
  },
});

const widths = useLocalStorage(
  `table-widths-${props.name}`,
  new Array(props.fields.length).fill(300)
);

const displayedFieldKeys = computed(() => {
  return Object.entries(props.fields).map(([_key, value]) => value.key);
});

const sortBy = ref(props.fields[0]);
const ascending = ref(true);

const sortedItems = computed(() =>
  props.items
    .filter((item) =>
      props.filterFuncs.reduce((acc, filter) => acc && filter(item), true)
    )
    .sort((a, b) =>
      (
        ascending.value
          ? !(a[sortBy.value.key] < b[sortBy.value.key])
          : a[sortBy.value.key] < b[sortBy.value.key]
      )
        ? 1
        : -1
    )
);

function setSort(field) {
  if (sortBy.value.key === field.key) {
    ascending.value = !ascending.value;
    return;
  }
  ascending.value = true;
  sortBy.value = field;
}
</script>

<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <th
          class="py-3 px-6 cursor-pointer hover:bg-gray-600 bg-gray-900 resize-x bg-white overflow-hidden text-ellipsis max-w-[30rem]"
          :key="field.key"
          @click="setSort(field)"
          scope="col"
          v-for="field of fields"
        >
          <span class="flex gap-4 items-center">
            {{ field.label }}
            <span
              class="text-lg"
              :class="{
                'i-mdi-chevron-up': ascending,
                'i-mdi-chevron-down': !ascending,
              }"
              v-if="sortBy.key == field.key"
            ></span>
          </span>
          <span class="i-mdi-drag-vertical-variant"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        v-for="item in sortedItems"
        :key="item.id"
        @click="onClick(item)"
      >
        <td
          v-for="key in displayedFieldKeys"
          scope="row"
          class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer overflow-x-hidden max-w-[3rem] text-ellipsis"
        >
          <slot :name="`cell(${key})`" :value="item[key]" :item="item">
            {{ item[key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
