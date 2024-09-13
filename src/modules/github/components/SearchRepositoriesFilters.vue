<script setup lang="ts">
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";
import { useEndpoints } from "../api";

const { filters, activeFilters } = storeToRefs(useGithubStore());

const { loading } = useEndpoints();

const submitDisabled = computed(() => {
  const { language } = filters.value;
  return loading.value || !language.length;
});

const onSubmit = () => {
  const { language, created, stars } = JSON.parse(
    JSON.stringify(filters.value)
  );
  const currentFilters = {
    language,
    ...((created.from || created.to) && { created }),
    ...(stars.from && { stars }),
  };
  activeFilters.value = currentFilters;
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
