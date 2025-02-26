<template lang="">
    <Navigationbar />
    <v-app-bar color="grey-lighten-2  m-4" name="app-bar">
        <v-app-bar-title>Create Surveys</v-app-bar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
    
     <v-container>
        <form @submit.prevent="submit">
            <SurveyForm :serveyImage="formData.image"/>
            <v-btn class="me-4" type="submit">
                submit
            </v-btn>
            <v-btn  @click="goToSurveys">
                Cancel
            </v-btn>
        </form>
    </v-container>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, onMounted } from 'vue'
import { useForm } from 'vee-validate';
import { useSurvey } from "@/api/survey";
import * as yup from 'yup';
import config from '@/config';
import dayjs from 'dayjs'
const snackbar = ref(false)
const router = useRouter()
const route = useRoute()
const survey = useSurvey()
const snackbarConf = reactive({
    color: 'error',
    text: 'Something went wrong!'
})

const formData = ref({
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
            options: [{
                title: ''
            }],
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
            if (!file && typeof file != 'string' ) return false
            return true
        })
        .test("File_Size", "The file size should be less then or equal 2MB", (file) => {
            if (file) {
                if(typeof file == 'string'){
                    return true
                }
                return file.size <= ((2 * 1024) * 1024)
            }
            return false
        }),
    questions: yup.array().of(
        yup.object({
            question: yup.string().required('Question is required'),
            type: yup.string().required('Type is required'),
            description: yup.string(),
            options: yup.array().of(
                yup.object({
                    title: yup.string()
                })
            )
        })
    )
});

const { validate, errors, values, resetForm } = useForm({
    validationSchema: surveySchema,
    initialValues: formData.value
})

const submit = async () => {
    try {
        const { valid } = await validate();
        if (!valid) {
            return
        }
        const payload = Object.assign({}, values);
        payload.expire_date = dayjs(payload.expire_date).format('YYYY-MM-DD HH:mm:ss')
         if(typeof values.image != 'string' ){
            payload.image = await readFileAsDataURL(values.image);
         }  else {
            payload.image = null
         }
        //  debugger
        const res = await survey.updateSurvey(route.params.id,payload)
        if (res.data.status == config.status.success) {
            snackbarConf.color = config.statuscolor.success
            snackbarConf.text = 'Survey insert Successfully'
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

onMounted(() => {
    getSurveyData();
})

async function getSurveyData() {
    try {
        const res = await survey.getSurvey(route.params.id)
        formData.value = { ...res.data.data }
        resetForm({ values: { ...res.data.data,expire_date:dayjs(res.data.data.expire_date).toDate(),image:null } })
    } catch (error) {
        console.log(error)
    }
}

function goToSurveys(){
    router.push({path:'/surveys'})
}

const urlToObject= async(imagePath)=> {
    if(imagePath){
        const response = await fetch(imagePath);
        // here image is url/location of image
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', {type: blob.type});
        formData.value.image  = file
    }
}
</script>
<style lang="">

</style>