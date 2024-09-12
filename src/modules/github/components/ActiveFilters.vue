<script setup lang="ts">
import { getFilterText } from "../constants";
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";

const { filters } = storeToRefs(useGithubStore());
const router = useRouter();
const activeFilters = computed(() => {
  const { q } = router.currentRoute.value.query;
  if (!q) return [];
  const current = q
    .toString()
    .split("+")
    .reduce((acc, item) => {
      const text = getFilterText(item, filters.value);
      if (!text) return acc;
      acc.push(text);
      return acc;
    }, <string[]>[]);
  return current;
});
</script>
<template>
  <p v-for="(filter, index) in activeFilters" :key="index">{{ filter }}</p>
</template>
