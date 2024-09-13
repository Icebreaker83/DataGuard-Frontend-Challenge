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

const page = ref(1);
const query = computed(() => {
  return `q=${filterQuery}&sort=stars&order=desc&page=${page.value}&per_page=100`;
});
const { getRepositoriesBySearchQuery } = useEndpoints();
const repositories = ref<GithubRepository[]>([]);
await getRepositoriesBySearchQuery(query.value, (response) => {
  repositories.value = response.data.items;
});

const loadingMore = ref(false);
const loadMore = (event: Event) => {
  const element = (event.currentTarget || event.target) as HTMLElement;
  if (!element) return;
  const { scrollHeight, scrollTop, clientHeight } = element;
  if (scrollTop + clientHeight < scrollHeight - page.value * 200) return;
  page.value++;
  loadingMore.value = true;
  getRepositoriesBySearchQuery(
    query.value,
    (response) => {
      repositories.value.push(...response.data.items);
    },
    () => {
      loadingMore.value = false;
    }
  );
};

let debounce: ReturnType<typeof setTimeout> | undefined;
const scrolling = (event: Event) => {
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    loadMore(event);
  }, 200);
};
</script>
<template>
  <v-card :max-height="xs ? '' : 400" class="fill-height d-flex flex-column">
    <template #title>
      <span>
        {{
          programmingLanguagesTitles[language] ?? language ?? $t("misc.self")
        }}
      </span>
      <v-progress-circular v-if="loadingMore" indeterminate class="mx-2" />
    </template>
    <v-virtual-scroll
      v-if="repositories.length"
      :items="repositories"
      max-height="348"
      @scroll.native="scrolling"
    >
      <template #default="{ item }">
        <v-list-item>
          <RepositoryInfo :key="item.name" :repository="item" />
        </v-list-item>
      </template>
    </v-virtual-scroll>
    <v-container flid v-else>
      <v-row justify="center">
        <v-col cols="6">{{ $t("misc.noData") }}</v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
