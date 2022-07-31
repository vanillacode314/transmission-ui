import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  ssr: false,
  unocss: {
    uno: false,
    icons: true,
    attributify: false,
  },
});
