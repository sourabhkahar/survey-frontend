import { useUserStore } from '@/store/auth.js'
import axios from 'axios';
export const api = () => {
    const {user} = useUserStore()
    return axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        responseType: 'json',
        headers: {
            Authorization: `Bearer ${user.token}`,
        }
    })

}