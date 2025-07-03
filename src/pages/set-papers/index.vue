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
      <PaperCard
        v-for="(paperItem,index) in papers"
        :key="index"
        :paper="paperItem"
        @open-delete-confirm-modal="openDeleteConfirmModal"
        @go-to-edit="goToEdit"
      />
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="paginationLink.current_page"
                :length="paginationLink.last_page"
                class="my-4"
                @update:model-value="onChangePage"
              />
            </v-container>
          </v-col>
        </v-row>
      </v-container>
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
import { useRouter } from 'vue-router';
import { useSetPaper } from "@/api/setpaper";
import config from '@/config';
const router = useRouter()
const setPaper = useSetPaper()
const papers = ref([])
const paginationLink = ref([])
const isConfirmModalOpen = ref(false)
const selectedRec = ref(null)
const snackbar = ref(false)
const pagination = ref({ ...config.pagination })

const snackbarConf = reactive({
  color: 'error',
  text: 'Something went wrong!'
})

function openDeleteConfirmModal(id) {
  isConfirmModalOpen.value = true;
  selectedRec.value = id
}

// async function deleteSurvey() {
//   try {
//     const res = await survey.deleteSurvey(selectedRec.value);
//     if (res.data.status == config.status.success) {
//       snackbarConf.color = config.statuscolor.success
//       snackbarConf.text = 'Survey Deleted Successfully'
//       getSurveyList()
//     }
//     snackbar.value = true
//   } catch (error) {
//     console.log(error)
//     snackbar.value = true
//   }
//   isConfirmModalOpen.value = false;
// }

function addPapers() {
  router.push({ path: '/set-papers/create' })
}

function onChangePage(item) {
  pagination.value.page = item
  getPaperList()
}
onMounted(() => {
  getPaperList();
})

async function getPaperList() {
  const res = await setPaper.getPapers(pagination.value)
  if (res.status == 200) {
    papers.value = res.data.data
    paginationLink.value = res.data.meta
    pagination.value.total = res.data.meta.total
  }
}

function goToEdit(id) {
  router.push({ path: `/set-papers/${id}` })
}


</script>
<route lang="json">{
  "name": "set-papers",
  "meta": {
    "requiresAuth": true
  }
}</route>

<style lang="">

</style>