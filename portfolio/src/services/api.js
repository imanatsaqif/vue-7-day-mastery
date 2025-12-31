import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': import.meta.env.VITE_GITHUB_TOKEN 
      ? `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
      : ''
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API Success] ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('[API Error]', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    })
    
    // Rate limit handling
    if (error.response?.status === 403 && 
        error.response.headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(error.response.headers['x-ratelimit-reset'] * 1000)
      console.error(`Rate limit exceeded. Resets at: ${resetTime.toLocaleTimeString()}`)
    }
    
    return Promise.reject(error)
  }
)

export default api