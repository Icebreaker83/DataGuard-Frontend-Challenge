<script setup lang="ts">
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";

const { activeFilters } = storeToRefs(useGithubStore());
const rerenderKey = ref(0);
watch(
  activeFilters,
  () => {
    rerenderKey.value++;
  },
  { deep: true }
);
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-h3">
        {{ $t("github.repositories.list.self") }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        {{ activeFilters }}
        <!-- <ActiveFilters /> -->
      </v-col>
    </v-row>
    <Suspense :key="rerenderKey">
      <template #default>
        <v-row v-if="'language' in activeFilters" justify="center">
          <v-col
            v-for="item in activeFilters.language"
            :key="item"
            cols="12"
            sm="6"
          >
            <RepositoryListSuspense :language="item" />
          </v-col>
        </v-row>
      </template>
      <template #fallback>
        <v-row v-if="'language' in activeFilters" justify="center">
          <v-col
            v-for="item in activeFilters.language"
            :key="item"
            cols="12"
            sm="6"
          >
            <v-skeleton-loader type="card" height="400" />
          </v-col>
        </v-row>
      </template>
    </Suspense>
    <!-- <v-row
      v-if="'language' in activeFilters"
      :key="rerenderKey"
      justify="center"
    >
      <v-col
        v-for="item in activeFilters.language"
        :key="item"
        cols="12"
        sm="6"
      >
        <Suspense>
          <template #default>
            <RepositoryListSuspense :language="item" />
          </template>
          <template #fallback>
            <v-skeleton-loader type="card" height="400" />
          </template>
        </Suspense>
      </v-col>
    </v-row> -->
  </v-container>
</template>
