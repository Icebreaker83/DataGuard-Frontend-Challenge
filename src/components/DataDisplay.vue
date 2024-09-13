<script setup lang="ts">
import { VTextarea, VTextField, VChip } from "vuetify/components";
import { getLocalizedDate } from "@/util/helpers";

const props = defineProps<{
  format?: "textarea" | "date" | "stars";
}>();
const formatters = {
  date: (value: string | number) => {
    return getLocalizedDate(value);
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

const toDisplay = computed(() => {
  if (props.format === "textarea")
    return {
      component: VTextarea,
      props: { modelValue: model },
    };
  if (props.format === "stars")
    return {
      component: VChip,
      props: {
        text: `${model.value} stars`,
        color: "success",
        "prepend-icon": "mdi-star",
      },
    };
  return { component: VTextField, props: { modelValue: model } };
});
</script>
<template>
  <component
    :is="toDisplay.component"
    v-bind="toDisplay.props"
    :closable="false"
    readonly
    hide-details
  />
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
