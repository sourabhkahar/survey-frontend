<template lang="">
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>{{ questionList.title }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <form @submit.prevent="submit">
          <v-card
            v-for="(question,index) in questionList.questions"
            :key="index"
            variant="outlined"
            class="mx-auto mt-2"
          >
            <v-card-item>
              <div>
                <div class="text-h6 mb-1">
                  {{ question.question }}
                </div>
                <div
                  v-if="question.type == 'radio'"
                  class="text-caption"
                >
                  <v-radio-group inline>
                    <template
                      v-for="(option,optIndex) in question.options"
                      :key="optIndex"
                    >
                      <v-radio
                        :label="option.title"
                        :value="option.title"
                      />
                    </template>
                  </v-radio-group>
                </div>
                <div
                  v-if="question.type == 'select'"
                  class="text-caption"
                >
                  <v-select
                    :items="question.options"
                    label="Select"
                    item-title="title"
                    item-value="title"
                  />
                </div>
              </div>
            </v-card-item>
          </v-card>
        </form>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>

import {  useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'
import { useSurvey } from "@/api/survey";
const route = useRoute()
const survey = useSurvey()
const questionList = ref({})
onMounted(() => {
    getSurveyData();
})
async function getSurveyData() {
    try {
        const res = await survey.getSurveyForUser(route.params.id)
        questionList.value = { ...res.data.data }
    } catch (error) {
        console.log(error)
    }
}
</script>
<style lang="">
    
</style>

<route lang="json">{
    "name": "test"
}</route>