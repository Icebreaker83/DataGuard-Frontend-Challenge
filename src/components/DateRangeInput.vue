<script setup lang="ts">
const model = defineModel<{ from?: string | null; to?: string | null }>({
  required: true,
});
</script>
<template>
  <div class="date-range-input-container">
    <v-text-field
      v-if="'from' in model"
      v-model="model.from"
      type="date"
      :label="$t('misc.from')"
      clearable
      hide-details
    />
    <v-text-field
      v-if="'to' in model"
      v-model="model.to"
      type="date"
      :label="$t('misc.to')"
      clearable
      hide-details
    />
  </div>
</template>
<style scoped lang="scss">
.date-range-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
