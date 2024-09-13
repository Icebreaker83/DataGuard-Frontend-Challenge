<script setup lang="ts">
import { GithubRepository } from "../types";

defineProps<{ repository: GithubRepository }>();
</script>
<template>
  <v-card variant="tonal">
    <template #title>
      <v-chip
        color="info"
        :text="repository.name"
        :href="repository.html_url"
        target="_blank"
      />
    </template>
    <v-container fluid class="pt-0">
      <v-row v-if="repository.description" dense>
        <v-col cols="12">
          <DataDisplay v-model="repository.description" variant="plain" />
        </v-col>
      </v-row>
      <v-row v-if="repository.created_at" dense>
        <v-col cols="12">
          <DataDisplay
            v-model="repository.created_at"
            format="date"
            variant="plain"
            :label="$t('github.created_at')"
          />
        </v-col>
      </v-row>
      <v-row v-if="repository.stargazers_count" dense>
        <v-col cols="12">
          <DataDisplay v-model="repository.stargazers_count" format="stars" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
