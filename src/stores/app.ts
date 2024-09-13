import { defineStore } from "pinia";

export const useAppStore = defineStore(
  "app",
  () => {
    const drawer = ref(true);
    return {
      drawer,
    };
  },
  { persist: true }
);
