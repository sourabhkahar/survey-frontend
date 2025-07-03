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

  <Navigationbar />
  <v-app-bar
    color="grey-lighten-2  m-4"
    name="app-bar"
  >
    <v-app-bar-title>Create Surveys</v-app-bar-title>
    <v-spacer />
  </v-app-bar>

  <v-container>
    <form @submit.prevent="submit">
      <v-row>
        <v-col cols="12">
          <v-text-field 
            v-model="title" 
            v-bind="titleAttrs" 
            label="Paper Title" 
            :error-messages="errors.title"
          />
        </v-col>
      </v-row>
      <!-- <v-container> -->
      <v-row>
        <v-col cols="12">
          <sections />
        </v-col>
      </v-row>
      <!-- </v-container> -->
      <v-btn 
        class="me-4" 
        type="submit"
      >
        submit
      </v-btn>
      <v-btn>
        Cancel
      </v-btn>
    </form>
  </v-container>
</template>
<script setup>
import { useRouter,useRoute } from 'vue-router';
import { ref, reactive, onMounted } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import config from '@/config';
import { useSetPaper } from "@/api/setpaper";

const setpaper = useSetPaper();
const snackbar = ref(false)
const router = useRouter()
const route = useRoute()
const snackbarConf = reactive({
  color: 'error',
  text: 'Something went wrong!'
})

const formData = reactive({
  title: '',
  sections: [
    {
      title: '',
      section_type: '',
      caption: '',
      total_marks: null,
      questions: [
        {
          question: '',
          type: '',
          description: '',
          options: [
            { title: '' }
          ],
        }
      ]
    }
  ]
})

let surveySchema = yup.object({
  title: yup.string().required(),
  sections: yup.array().of(
    yup.object().shape({
      title: yup.string().required('title is required'),
      section_type: yup.string().required('section type is required'),
      caption: yup.string().required('caption is required'),
      total_marks: yup.number().required('total marks is required').positive('total marks must be a positive number'),
      questions: yup.array().of(
        yup.object().shape({
          question: yup.string().required(),
          type: yup.string().required(),
          description: yup.string(),
          options: yup.array(
            yup.object().shape({
              title: yup.mixed().test("Option", 'Option title', (test, contex) => {
                if (!test && ['select', 'checkbox', 'radio'].includes(contex.from[1].value.type)) {
                  return false
                }
                return true
              })
            })
          )
        })
      )
    })
  )
});

const { validate, values, errors, defineField,resetForm } = useForm({
  validationSchema: surveySchema,
  initialValues: formData
})
const [title, titleAttrs] = defineField('title');
const submit = async () => {
  try {
    const { valid } = await validate();
    if (!valid) {
      return
    }

    const payload = Object.assign({}, values);
    const res = await setpaper.createSetPaper(payload);
    console.log(res)
    if (res.data.status == config.status.success) {
      snackbarConf.color = config.statuscolor.success
      snackbarConf.text = 'Survey Created Successfully'
      router.push({ name: 'surveys' })
    } else {
      snackbarConf.color = config.statuscolor.fail
    }
    snackbar.value = true
  } catch (error) {
    console.log(error)
    snackbar.value = true
  }
}

onMounted(() => {
    getPaperData();
})

async function getPaperData() {
    try {
        const res = await setpaper.getPaper(route.params.id)
        formData.value = { ...res.data.data }
        resetForm({ values: { ...res.data.data } })
    } catch (error) {
        console.log(error)
    }
}


</script>
<style lang="">

</style>
<route lang="json">{
    "name": "edit-set-paper",
    "meta": {
      "requiresAuth": true
    }
  }</route>