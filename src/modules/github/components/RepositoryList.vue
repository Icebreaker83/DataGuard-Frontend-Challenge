<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";
import { getSearchQuery } from "../constants";
import { useEndpoints } from "../api";
import { GithubRepository } from "../types";
import { programmingLanguagesTitles } from "@/util/constants";

const props = defineProps<{ language: string }>();

const { xs } = useDisplay();
const { activeFilters } = storeToRefs(useGithubStore());
const filterQuery = getSearchQuery({
  ...activeFilters.value,
  language: [props.language],
});

const query = `q=${filterQuery}&sort=stars&order=desc&page=1&per_page=100`;
const { getRepositoriesBySearchQuery } = useEndpoints();
const repositories = ref<GithubRepository[]>([]);
await getRepositoriesBySearchQuery(query, (response) => {
  repositories.value = response.data.items;
});
</script>
<template>
  <v-card
    :title="programmingLanguagesTitles[language] ?? language ?? $t('misc.self')"
    :max-height="xs ? '' : 400"
    class="fill-height d-flex flex-column"
  >
    <v-virtual-scroll :items="repositories" max-height="348">
      <template #default="{ item }">
        <v-list-item>
          <RepositoryInfo :key="item.name" :repository="item" />
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
