import axios from 'axios'

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return '/api'
  }
  return import.meta.env.VITE_API_BASE_URL || 'https://a1.sunsysweb.co.in/api'
}

const api = axios.create({ baseURL: getBaseURL() })

export const getApiBaseURL = getBaseURL

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(res => res, err => {
  if (err.response?.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/admin/login'
  }
  return Promise.reject(err)
})

export default api
