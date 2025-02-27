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
      <SurveyForm />
      <v-btn
        class="me-4"
        type="submit"
      >
        submit
      </v-btn>
      <v-btn @click="goToSurveys">
        Cancel
      </v-btn>
    </form>
  </v-container>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue'
import { useForm } from 'vee-validate';
import { useSurvey } from "@/api/survey";
import * as yup from 'yup';
import config from '@/config';
const snackbar = ref(false)
const router = useRouter()
const survey = useSurvey()
const snackbarConf = reactive({
    color: 'error',
    text: 'Something went wrong!'
})

const formData = reactive({
    title: null,
    description: null,
    expire_date: null,
    status: true,
    image: null,
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
})

let surveySchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    expire_date: yup.string().required(),
    status: yup.boolean().required(),
    image: yup.mixed()
        .test("File_Require", "The file is required", (file) => {
            if (!file) return false
            return true
        })
        .test("File_Size", "The file size should be less then or equal 2MB", (file) => {
            if (file) {
                return file.size <= ((2 * 1024) * 1024)
            }
            return false
        }),
    questions: yup.array().min(1).of(
        yup.object().shape({
            question: yup.string().required('Question is required'),
            type: yup.string().required('Type is required'),
            description: yup.string(),
            data: yup.array(
                yup.object().shape({
                    title: yup.mixed().test("Option",'Option title',(test,contex)=>{
                        if(!test && ['select','checkbox','radio'].includes(contex.from[1].value.type)){
                            return false
                        }
                        return true
                    })
                })
            )
        })
    )
});

const { validate, values } = useForm({
    validationSchema: surveySchema,
    initialValues: formData
})

const submit = async () => {
    try {
        const { valid } = await validate();
        if (!valid) {
            return
        }
        const payload = Object.assign({}, values);
        payload.image = await readFileAsDataURL(values.image);
        const res = await survey.createSurvey(payload)
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

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

function goToSurveys(){
    router.push({path:'/surveys'})
}
</script>
<style lang="">

</style>