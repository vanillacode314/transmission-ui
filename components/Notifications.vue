<script setup lang="ts">
import { storeToRefs } from "pinia";

const { messages } = storeToRefs(useNotifications());
</script>
<template>
  <TransitionGroup
    name="list"
    tag="ul"
    class="fixed bottom-0 right-0 p-5 gap-3 grid"
  >
    <li v-for="message of messages" :key="message.id">
      <BaseToast :kind="message.kind">{{ message.text }} </BaseToast>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translate(100px);
}

.list-leave-active {
  position: absolute;
}
</style>
