<script setup lang="ts">
import { programmingLanguages } from "@/util/constants";
const model = defineModel<string[]>({ required: true });

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
