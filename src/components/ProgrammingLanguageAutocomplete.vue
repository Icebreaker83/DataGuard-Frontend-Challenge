<script setup lang="ts">
const model = defineModel<string[]>({ required: true });

const programmingLanguages = [
  { value: "javascript", title: "JavaScript" },
  { value: "typescript", title: "TypeScript" },
  { value: "c", title: "C" },
] as const;

const customFilter = (itemTitle: string, queryText: string) => {
  return itemTitle.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
};
</script>
<template>
  <v-autocomplete
    v-model="model"
    :items="programmingLanguages"
    multiple
    chips
    closable-chips
    hide-details
    :custom-filter="customFilter"
  />
</template>
