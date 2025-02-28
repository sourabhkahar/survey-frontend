<template lang="">
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
        Cancel
      </v-btn>
    </template>
  </v-snackbar>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>{{ questionList.title }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <form @submit.prevent="submit">
          <v-card
            v-for="(question,index) in fields"
            :key="index"
            class="mx-auto mt-2"
          >
            <!-- {{question}} -->
            <v-card-item>
              <div class="text-h6 mb-1">
                {{ question.value.question }}
              </div>
              <div
                v-if="question.value.type == 'radio'"
                class="text-caption"
              >
                <v-radio-group
                  v-model="question.value.answer"
                  inline
                >
                  <template
                    v-for="(option,optIndex) in question.value.options"
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
                v-if="question.value.type == 'select'"
                class="text-caption"
              >
                <v-select
                  v-model="question.value.answer"
                  :items="question.value.options"
                  label="Select"
                  item-title="title"
                  item-value="title"
                />
              </div>

              <div
                v-if="question.value.type == 'text'"
                class="text-caption"
              >
                <v-text-field
                  v-model="question.value.answer"
                  label="Title"
                />
              </div>

              <div
                v-if="question.value.type == 'checkbox'"
                class="text-caption"
              >
                <v-checkbox
                  v-for="(item,chindex) in question.value.options"
                  :key="chindex"
                  v-model="question.value.answer"
                  :label="item.title"
                  :value="item.title"
                />
              </div>
            </v-card-item>
          </v-card>
          <v-btn
            class="me-4 mt-2"
            type="submit"
          >
            submit
          </v-btn>
          <v-btn class="me-4 mt-2">
            Cancel
          </v-btn>
        </form>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>

import {  useRoute } from 'vue-router';
import { ref, onMounted,reactive  } from 'vue'
import { useSurvey } from "@/api/survey";
import { useFieldArray,useForm } from 'vee-validate'
import * as yup from 'yup';
import config from '@/config';
const snackbarConf = reactive({
    color: 'error',
    text: 'Something went wrong!'
})
const snackbar = ref(false)
const route = useRoute()
const survey = useSurvey()
const formData = ref({
    answers:[]
})

let surveySchema = yup.object({
    answers: yup.array().of(
      yup.object().shape({
        answer: yup.mixed().required()
    })
  )
})  

const { validate,  values, resetForm } = useForm({
    validationSchema: surveySchema,
    initialValues: formData
})

const { fields } = useFieldArray(`answers`)
const questionList = ref({})

onMounted(() => {
    getSurveyData();
})

async function getSurveyData() {
    try {
        const res = await survey.getSurveyForUser(route.params.id)
        res.data.data.questions.forEach((eleme) => {

        formData.value.answers.push({
            ...eleme,
            question_id:eleme.id,
            answer:eleme.type == 'checkbox'?[]:null,
          })
        });
        resetForm({ values: {...formData.value}  })
        questionList.value = { ...res.data.data }
    } catch (error) {
        console.log(error)
    }
}

const submit = async () => {
    try {
        const { valid } = await validate();
        if (!valid) {
          snackbarConf.text = 'Please Answer All Question !'
          snackbarConf.color = config.statuscolor.fail
          snackbar.value = true
            return
        }

        const payload = values.answers.map((item) => {
            return { [ item.question_id ] : item.answer}
        })

        
        const res = await survey.submitSurveyAnswer(questionList.value.id,{answers:payload})
        if (res.data.status == config.status.success) {
            snackbarConf.color = config.statuscolor.success
            snackbarConf.text = 'Survey Created Successfully'
            resetForm()
        } else {
            snackbarConf.color = config.statuscolor.fail
        }
        snackbar.value = true
    } catch (error) {
        console.log(error)
        snackbar.value = true
    }
}
</script>
<style lang="">
    
</style>

<route lang="json">{
    "name": "test"
}</route>