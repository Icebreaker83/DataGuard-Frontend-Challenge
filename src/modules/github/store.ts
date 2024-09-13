import { defineStore } from "pinia";
import {
  SearchRepositoriesFilters,
  SearchRepositoriesActiveFilters,
} from "./types";

export const useGithubStore = defineStore(
  "github",
  () => {
    const filters = ref<SearchRepositoriesFilters>({
      language: [],
      created: { from: null, to: null },
      stars: { from: null },
    });
    const activeFilters = ref<SearchRepositoriesActiveFilters>({});

    return {
      filters,
      activeFilters,
    };
  },
  { persist: true }
);
