<script setup lang="ts">
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";
import { useEndpoints } from "../api";
import { getSearchQuery } from "../constants";

const { filters } = storeToRefs(useGithubStore());
const { setRepositoriesByLanguage } = useGithubStore();
const { loading, getRepositoriesBySearchQuery } = useEndpoints();

const submitDisabled = computed(() => {
  const { language, created, stars } = filters.value;
  return (
    loading.value ||
    (!language.length && !created.from && !created.to && !stars)
  );
});
const onSubmit = () => {
  const query = getSearchQuery(filters.value);
  if (!query) return;
  getRepositoriesBySearchQuery(query, (response) => {
    setRepositoriesByLanguage(response.data.items);
  });
};
</script>
<template>
  <TheFilters :disabled="submitDisabled" @submit="onSubmit">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <ProgrammingLanguageAutocomplete
            v-model="filters.language"
            :label="$t('github.filters.language.self')"
            :placeholder="$t('github.filters.language.placeholder')"
          />
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12">
          <DateRangeInput v-model="filters.created" />
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="filters.stars.from"
            type="number"
            :label="$t('github.filters.stars.label')"
            clearable
            hide-details
            append-inner-icon="mdi-star"
          />
        </v-col>
      </v-row>
    </v-container>
  </TheFilters>
</template>
