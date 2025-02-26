import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
export const useUserStore = defineStore('surveys', () => {
   
    const user = reactive({
        id: '',
        token: '',
        name: ''
    })

    const logout = () => {
        user.token = ''
        user.id = ''
        user.name = ''
    }

    const setUser = (data) => {
        user.token = data.data.token
        user.id = data.data.user.id
        user.name = data.data.user.name
    }

    return { user, logout, setUser }
},
{ persist: true },
)