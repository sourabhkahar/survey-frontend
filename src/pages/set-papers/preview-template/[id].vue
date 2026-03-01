<template lang="">
  <Navigationbar />
  <v-app-bar
    color="grey-lighten-2  m-4"
    name="app-bar"
  >
    <v-app-bar-title>Preview Template</v-app-bar-title>
  </v-app-bar>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      multi-line
      :timeout="3000"
      :color="snackbarConf.color"
    >
      {{ snackbarConf.text }}
      <template #actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <PaperTemplate/>
    </v-row>
  </v-container>

  <v-dialog
    v-model="isConfirmModalOpen"
    max-width="400"
    persistent
  >
    <v-card
      prepend-icon="mdi-map-marker"
      text="Do you want to delete survey?"
      title="Delete survey?"
    >
      <template #actions>
        <v-spacer />
        <v-btn @click="deleteSurvey">
          Yes
        </v-btn>
        <v-btn @click="isConfirmModalOpen = false">
          No
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<script setup>

import { reactive, ref } from 'vue';
const snackbarConf = reactive({
  color: 'error',
  text: 'Something went wrong!'
})
const isConfirmModalOpen = ref(false)
const snackbar = ref(false)

</script>
<route lang="json">{
  "name": "preview-template",
  "meta": {
    "requiresAuth": true
  }
}</route>

<style lang="">

</style>