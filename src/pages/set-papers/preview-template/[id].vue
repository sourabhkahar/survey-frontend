<template lang="">
  <Navigationbar />
  <v-app-bar
    color="grey-lighten-2  m-4"
    name="app-bar"
  >
    <v-app-bar-title>Set Papers</v-app-bar-title>
    <v-spacer />
    <v-btn
      elevation="3"
      class="mr-4"
      @click="addPapers"
    >
      Add Paper
    </v-btn>
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
      <PaperTemplate
        v-for="(paperItem,index) in papersTemplate"
        :key="index"
        :paper-template="paperItem"
      />
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

import { onMounted, reactive, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useSetPaper } from "@/api/setpaper";
import config from '@/config';
// const router = useRouter()
const setPaper = useSetPaper()
const papersTemplate = ref([])
const isConfirmModalOpen = ref(false)
const snackbar = ref(false)
const pagination = ref({ ...config.pagination })

const snackbarConf = reactive({
  color: 'error',
  text: 'Something went wrong!'
})

function addPapers() {
  // router.push({ path: '/set-papers/create' })
}

// function onChangePage(item) {
//   pagination.value.page = item
//   getTemplateList()
// }
onMounted(() => {
  getTemplateList();
})

async function getTemplateList() {
  const res = await setPaper.getTemplateList(pagination.value)
  if (res.status == 200) {
    papersTemplate.value = res.data.data
  } else {
    console.log('error');
  }
}

// function goToEdit(id) {
//   router.push({ path: `/surveys/${id}` })
// }


</script>
<route lang="json">{
  "name": "preview-template",
  "meta": {
    "requiresAuth": true
  }
}</route>

<style lang="">

</style>