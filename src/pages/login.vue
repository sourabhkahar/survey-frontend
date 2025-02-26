<template>
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

    <v-card class="mx-auto  pa-12 pb-8" elevation="8" min-width="448" max-width="448" rounded="lg">
        <form @submit.prevent="submit">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="email" :error-messages="errors.email"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password

                <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                    target="_blank">
                    Forgot login password?</a>
            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="visible = !visible" v-model="password"
                :error-messages="errors.password"></v-text-field>

            <v-checkbox v-model="remember" label="Remeber me" />
            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block type="submit">
                Log In
            </v-btn>

            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" @click.prevent="goToRegister">
                    Sign up now <v-icon icon=" mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </form>
    </v-card>
    <!-- </v-container> -->
</template>


<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from '@/api/auth';
import config from '@/config';
import { useUserStore } from '@/store';
const auth = useAuth()
const user = useUserStore()
const visible = ref(false)
const snackbar = ref(false)
const router = useRouter()
const snackbarConf = reactive({
    color: 'error',
    text: 'Something went wrong!'
})
function goToRegister() {
    router.push({ path: '/register' })
}

const formData = reactive({
    email: 'peterparker@gmail.com',
    password: 'Admin@123',
    remember: false
})
let userSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    remember: yup.boolean()
});
const { defineField, validate, errors, values } = useForm({
    validationSchema: userSchema,
    initialValues: formData
})

const [email] = defineField('email');
const [password] = defineField('password');
const [remember] = defineField('remember');


const submit = async () => {
    try {

        const { valid } = await validate();
        if (!valid) {
            return
        }
        const res = await auth.login(values)
        if (res.data.status == config.status.success) {
            user.setUser(res.data)
            snackbarConf.color = config.statuscolor.success
            snackbarConf.text = 'User insert Successfully'
            router.push({ name: 'dashboard' })
        } else {
            snackbarConf.color = config.statuscolor.fail
        }
        snackbar.value = true
    } catch (error) {
        snackbar.value = true
    }
}
</script>

<route lang="json">{
    "name": "login",
    "meta": {
        "isGuest": true
    }
}</route>
