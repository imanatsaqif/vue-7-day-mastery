import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_WEATHERAPI_BASE_URL,
  timeout: 10000,
  params: {
    key: import.meta.env.VITE_WEATHERAPI_KEY
  }
})

// Request interceptor for caching
api.interceptors.request.use(
  (config) => {
    // Add cache key for GET requests
    if (config.method === 'get') {
      const cacheKey = btoa(JSON.stringify(config))
      config.cacheKey = cacheKey
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error messages for WeatherAPI
    if (error.response?.status === 400) {
      error.message = 'Invalid location or request parameters'
    } else if (error.response?.status === 401) {
      error.message = 'Invalid API key'
    } else if (error.response?.status === 403) {
      error.message = 'API access forbidden'
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - please try again'
    }
    return Promise.reject(error)
  }
)

export default api