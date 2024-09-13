<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const { drawer } = storeToRefs(useAppStore());
</script>
<template>
  <v-app>
    <v-app-bar prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
