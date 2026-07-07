import axios from 'axios'

const getBaseURL = () => {
  // In development, use the Vite proxy
  if (import.meta.env.DEV) {
    return '/api'
  }
  // In production, point directly to the backend server
  return 'https://a1.sunsysweb.co.in/api'
}

const api = axios.create({ baseURL: getBaseURL() })

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
