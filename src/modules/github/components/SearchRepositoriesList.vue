<script setup lang="ts">
import { useGithubStore } from "../store";
import { storeToRefs } from "pinia";

const { repositoriesByLanguage } = storeToRefs(useGithubStore());
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
        <ActiveFilters />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="item in repositoriesByLanguage"
        :key="item.value"
        cols="12"
        sm="6"
      >
        <RepositoryList :language="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
