<template>
    <!-- <v-container class="fill-height"> -->
    <v-snackbar v-model="snackbar" multi-line :timeout="3000" :color="snackbarConf.color">
        {{ snackbarConf.text }}

        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>

    <v-img class="mx-auto my-6" max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" min-width="448" max-width="448" rounded="lg">
        <form @submit.prevent="submit">
            <div class="text-subtitle-1 text-medium-emphasis">Name</div>

            <v-text-field density="compact" placeholder="Name" prepend-inner-icon="mdi-email-outline" variant="outlined"
                v-model="name" :error-messages="errors.name"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Email</div>

            <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="email" :error-messages="errors.email"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">Phone</div>

            <v-text-field density="compact" placeholder="Phone" prepend-inner-icon="mdi-phone-outline"
                variant="outlined" v-model="phone" :error-messages="errors.phone"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password
            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="visible = !visible" v-model="password"
                :error-messages="errors.password"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Confirm Password

            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Confirm Password" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="visible = !visible" v-model="password_confirmation"
                :error-messages="errors.password_confirmation"></v-text-field>



            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block type="submit">
                Sign Up
            </v-btn>
            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" @click.prevent="goToLogin">
                    Login <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </form>
    </v-card>
    <!-- </v-container> -->
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/api/auth'
import { onMounted, reactive, ref } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useUserStore } from "@/store/auth";
import config from '@/config';
const visible = ref(false)
const router = useRouter()
const user = useUserStore()
const auth = useAuth()
const snackbar = ref(false)
const snackbarConf = reactive({
    color: 'error',
    text: 'Something went wrong!'
})
function goToLogin() {
    router.push({ path: '/login' })
}

const formData = reactive({
    name: 'joe',
    email: 'joe@gmail.com',
    phone: '7894561230',
    password: 'Admin@123',
    password_confirmation: 'Admin@123'
})
let userSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    password: yup.string().required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});
const { defineField, validate, errors, values } = useForm({
    validationSchema: userSchema,
    initialValues: formData
})

const [name] = defineField('name');
const [email] = defineField('email');
const [phone] = defineField('phone');
const [password] = defineField('password');
const [password_confirmation] = defineField('password_confirmation');
onMounted(() => {
    // console.log(auth)
})

const submit = async () => {
    try {

        const { valid } = await validate();
        if (!valid) {
            return
        }
        const res = await auth.register(values)
        if (res.data.status == config.status.success) {
            // console.log(res.data)
            user.setUser(res.data)
            snackbarConf.color = config.statuscolor.success
            snackbarConf.text = 'User insert Successfully'
            router.push({ name: 'dashboard' })
        } else {
            snackbarConf.color = config.statuscolor.fail
        }
        snackbar.value = true
    } catch (error) {
        // console.log(error)
        snackbar.value = true
    }
}
</script>
<route lang="json">{
    "name": "register",
    "meta": {
        "isGuest": true
    }
}</route>