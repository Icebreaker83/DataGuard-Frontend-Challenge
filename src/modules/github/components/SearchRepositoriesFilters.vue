<script setup lang="ts">
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";
import { useEndpoints } from "../api";
// import { getSearchQuery } from "../constants";

const { filters, activeFilters } = storeToRefs(useGithubStore());
// const { setRepositoriesByLanguage } = useGithubStore();
// const { loading, getRepositoriesBySearchQuery } = useEndpoints();
const { loading } = useEndpoints();

const submitDisabled = computed(() => {
  const { language } = filters.value;
  return loading.value || !language.length;
});

// const router = useRouter();
const onSubmit = () => {
  const { language, created, stars } = filters.value;
  const currentFilters = {
    language,
    ...((created.from || created.to) && {
      created: JSON.parse(JSON.stringify(created)),
    }),
    ...(stars.from && { stars: JSON.parse(JSON.stringify(stars)) }),
  };
  Object.assign(activeFilters.value, currentFilters);
  // const filterString = getSearchQuery(filters.value);
  // if (!filterString) return;
  // const query = {
  //   q: getSearchQuery(filters.value),
  //   sort: "stars",
  //   order: "desc",
  // };
  // router.replace({ query });
  // const queryString = Object.entries(query)
  //   .reduce((acc, [key, value]) => {
  //     acc.push(`${key}=${value}`);
  //     return acc;
  //   }, <string[]>[])
  //   .join("&");
  // getRepositoriesBySearchQuery(queryString, (response) => {
  //   router.replace({ query });
  //   setRepositoriesByLanguage(response.data.items);
  // });
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
