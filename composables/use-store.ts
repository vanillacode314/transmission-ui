import { defineStore } from "pinia";
import { FilterFunc } from "~~/components/base/Table.vue";

export default defineStore("main", () => {
  const host = useLocalStorage<string>("host", "127.0.0.1");
  const port = useLocalStorage<number>("port", 9091);
  const user = useLocalStorage<string>("user", null);
  const pass = useLocalStorage<string>("pass", null);
  const id = ref<string>(null);
  const filters = ref<FilterFunc[]>([]);

  async function getID() {
    const { id: i } = await $fetch<{ id: string }>(
      `/api/getSessionId?host=${host.value}&port=${port.value}`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${user.value}:${pass.value}`)}`,
        },
      }
    );
    id.value = i;
  }

  async function runMethod(method: string, args: any): Promise<any> {
    const data = await $fetch("/api/runMethod", {
      method: "post",
      headers: {
        Authorization: `Basic ${btoa(`${user.value}:${pass.value}`)}`,
        "X-Transmission-Session-Id": id.value,
      },
      body: {
        host: host.value,
        port: port.value,
        method,
        args,
      },
    });
    return data;
  }

  return { host, port, user, pass, id, getID, runMethod, filters };
});
