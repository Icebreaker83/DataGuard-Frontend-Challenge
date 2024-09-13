<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const props = defineProps<{ disabled: boolean }>();
const emit = defineEmits(["submit"]);

const { drawer } = storeToRefs(useAppStore());
const onSubmit = () => {
  if (props.disabled) return;
  emit("submit");
};
</script>
<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item
        prepend-icon="mdi-filter-multiple"
        :title="$t('filters.self')"
      />
    </v-list>
    <v-divider />
    <slot></slot>

    <v-divider />
    <v-container fluid>
      <v-btn
        color="info"
        block
        :disabled="props.disabled"
        prepend-icon="mdi-magnify"
        :text="$t('filters.submit')"
        class="text-none"
        @click.stop="onSubmit"
      />
    </v-container>
  </v-navigation-drawer>
</template>
