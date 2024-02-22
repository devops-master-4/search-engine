import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'multipart/form-data/',
    },
})
