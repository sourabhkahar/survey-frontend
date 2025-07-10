<template>
  <Navigationbar />
  <v-container>
    Dashboard
    <v-row>
      <v-col>
        <v-card
          class="mx-auto my-8"
          elevation="16"
          max-width="344"
        >
          <v-card-item>
            <v-card-title>
              Latest Survey
            </v-card-title>
          </v-card-item>

          <v-card-text>
            <v-row>
              <v-col>
                Uploaded Date: {{ getUploadedDate }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Answers: {{ dashboardData.totalAnswers }}
              </v-col>
              <v-col>
                <v-btn 
                  v-if="dashboardData.latestSurveys"
                  icon="mdi mdi-arrow-top-right-bold-box-outline"
                  class="align-start" 
                  @click="router.push({name:'edit-survey',params:{id:dashboardData.latestSurveys.id}})"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-img 
                height="200px" 
                :src="getImage(dashboardData.latestSurveys?.image)" 
                cover 
              />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto my-8"
          elevation="16"
          max-width="344"
        >
          <v-card-item>
            <v-card-title>
              Total Survey
            </v-card-title>
            <v-card-subtitle>
              {{ dashboardData.totalSurveys }}
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto my-8"
          elevation="16"
          max-width="344"
        >
          <v-card-item>
            <v-card-title>
              Total Anwers
            </v-card-title>

            <v-card-subtitle>
              {{ dashboardData.totalAnswers }}
            </v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {  useRouter } from 'vue-router';
import Navigationbar from '@/components/Navigationbar.vue';
import { computed, onMounted, ref } from 'vue';
import { useSurvey } from "@/api/survey";
import dayjs from 'dayjs';
const survey = useSurvey()
const router = useRouter()
const dashboardData = ref({})

const getUploadedDate = computed(()=>{
  return dashboardData.value?.latestSurveys?.created_at?dayjs(dashboardData.value.latestSurveys.created_at).format('YYYY-MM-DD'):'-'
}) 

onMounted(() => {
    getDashBoardData();
})

async function getDashBoardData() {
    try {
        const res = await survey.getDashBoardData()
        dashboardData.value = {...res.data.data}
    } catch (error) {
        console.log(error)
    }
}
function getImage(image) {
  return image ? (import.meta.env.VITE_API_BASE_IMAGE_URL + image) : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
}

</script>


<route lang="json">{
  "name": "dashboard",
  "meta": {
    "requiresAuth": true
  }
}</route>
