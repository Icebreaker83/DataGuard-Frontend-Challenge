<script setup lang="ts">
const props = defineProps<{ disabled: boolean }>();
const emit = defineEmits(["submit"]);
const onSubmit = () => {
  if (props.disabled) return;
  emit("submit");
};
</script>
<template>
  <v-navigation-drawer>
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
        class="text-none"
        @click.stop="onSubmit"
      >
        {{ $t("filters.submit") }}
      </v-btn>
    </v-container>
  </v-navigation-drawer>
</template>
