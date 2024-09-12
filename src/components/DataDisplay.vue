<script setup lang="ts">
import { VTextarea, VTextField } from "vuetify/components";

const props = defineProps<{
  format?: "textarea" | "date" | "stars";
}>();
const formatters = {
  date: (value: string | number) => {
    const date = new Date(value);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString();
  },
  textarea: (value: string | number) => {
    return value;
  },
  stars: (value: string | number) => {
    return value.toLocaleString();
  },
};
const model = defineModel<string | number | null>({
  get(value) {
    if (value === null || !props.format) return value;
    const formatter = formatters[props.format];
    return formatter(value);
  },
  required: true,
});

const componentToDisplay = computed(() => {
  if (props.format === "textarea") return VTextarea;
  return VTextField;
});
</script>
<template>
  <component
    :is="componentToDisplay"
    v-model="model"
    :closable="false"
    readonly
    hide-details
    class="test"
  >
    <template #prepend-inner v-if="props.format === 'stars'">
      <v-chip color="success" prepend-icon="mdi-star" text="stars" />
    </template>
  </component>
</template>
<style scoped lang="scss">
.v-text-field {
  :deep(.v-field__input) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
