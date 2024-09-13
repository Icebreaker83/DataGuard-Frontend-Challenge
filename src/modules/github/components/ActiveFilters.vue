<script setup lang="ts">
import { getFilterTextFromActiveFilters } from "../constants";
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";

const { activeFilters } = storeToRefs(useGithubStore());

const filters = computed(() => {
  const { created, stars } = activeFilters.value;
  if (!created && !stars) return [];
  return getFilterTextFromActiveFilters(activeFilters.value);
});
</script>
<template>
  <p v-for="(filter, index) in filters" :key="index">{{ filter }}</p>
</template>
