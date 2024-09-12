<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-row>
          <v-col class="text-h3">{{ $t("404") }}</v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :to="{ path: '/' }"
              prepend-icon="mdi-home"
              color="info"
              :text="$t('misc.home')"
              class="text-none"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
