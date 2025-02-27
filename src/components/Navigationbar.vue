<template lang="">
  <DisplayMessage
    :snackbar="snackbar"
    :snackbar-conf="snackbarConf"
    @closemessage="closemessage"
  />
  <v-app-bar
    class="px-3"
    density="compact"
    flat
  >
    <div class="text-center">
      <v-menu
        :close-on-content-click="false"
        location="end"
      >
        <template #activator="{ props }">
          <v-btn v-bind="props">
            <v-avatar
              class="hidden-sm-and-down"
              color="grey-darken-1"
              size="32"
            >
              <img
                src="https://picsum.photos/id/237/200/300"
                width="50"
                height="50"
              >
            </v-avatar>
          </v-btn>
        </template>
        <v-card min-width="300">
          <v-list>
            <v-list-item>
              <v-btn
                class="w-100"
                @click.prevent="logout"
              >
                Logout
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <v-spacer />
    <v-tabs
      color="grey-darken-2"
      centered
    >
      <router-link
        v-for="(link,index) in links"
        :key="index"
        :to="link.to"
      >
        <v-tab :text="link.name" />
      </router-link>
    </v-tabs>
    <v-spacer />
  </v-app-bar>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/index.js'
import { useRouter } from 'vue-router';
import { useAuth } from '@/api/auth';
import config from '@/config';
const auth = useAuth()
const user = useUserStore()
const router = useRouter()
const snackbar = ref(false)
const snackbarConf = reactive({
   color: 'error',
   text: 'Something went wrong!'
})

const links = ref([
   { name: 'Dashboard', to: '/' },
   { name: 'Surveys', to: '/surveys' },
])

const logout = async () => {
   const res = await auth.logout()
   if (res.data.status == config.status.success) {
      user.logout()
      snackbarConf.color = config.statuscolor.success
      snackbarConf.text = 'Logout Successfully'
      router.push({ name: 'login' })
   } else {
      snackbarConf.color = config.statuscolor.fail
   }
   snackbar.value = true
}

function closemessage() {
   snackbar.value = false
}
</script>
<style lang="">

</style>