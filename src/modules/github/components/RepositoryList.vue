<script setup lang="ts">
import { useDisplay } from "vuetify";
import { GithubRepositoriesByLanguage } from "../types";

defineProps<{ language: GithubRepositoriesByLanguage }>();

const { xs } = useDisplay();
</script>
<template>
  <v-card
    :title="language.value ?? $t('misc.self')"
    :max-height="xs ? '' : 400"
    class="fill-height d-flex flex-column"
  >
    <v-container fluid :class="{ 'overflow-auto': !xs }">
      <RepositoryInfo
        v-for="repository in language.items"
        :key="repository.name"
        :repository="repository"
        class="mb-4"
      />
    </v-container>
  </v-card>
</template>
