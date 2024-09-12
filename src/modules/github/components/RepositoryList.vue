<script setup lang="ts">
import { GithubRepositoriesByLanguage } from "../types";

defineProps<{ language: GithubRepositoriesByLanguage }>();
</script>
<template>
  <v-card
    :title="language.value ?? $t('misc.self')"
    max-height="400"
    class="fill-height d-flex flex-column"
  >
    <v-container fluid class="overflow-auto">
      <RepositoryInfo
        v-for="repository in language.items"
        :key="repository.name"
        :repository="repository"
        class="mb-4"
      />
    </v-container>
  </v-card>
</template>
