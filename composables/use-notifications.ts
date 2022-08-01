import { defineStore } from "pinia";

export interface Message {
  id: string;
  text: string;
  kind: "success" | "warn" | "error";
}

export default defineStore("notifications", () => {
  const messages = ref<Message[]>([]);

  function notify(
    kind: Message["kind"],
    text: Message["text"],
    duration = 5000
  ) {
    if (!window) return;
    const id = crypto.randomUUID();
    const message = {
      id,
      text,
      kind,
    };

    messages.value.push(message);
    setTimeout(
      () => (messages.value = messages.value.filter((m) => m.id !== id)),
      duration
    );
  }

  return { notify, messages };
});
