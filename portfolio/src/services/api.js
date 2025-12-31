// src/services/api.js
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

// Add request timeout handling
api.interceptors.request.use(
  (config) => {
    // Add timestamp for potential request tracking
    config.metadata = { startTime: new Date() }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    const endTime = new Date()
    const duration = endTime - response.config.metadata.startTime
    console.debug(`[API] ${response.config.method.toUpperCase()} ${response.config.url} (${duration}ms)`)
    return response
  },
  (error) => {
    // Enhanced error handling
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - please try again'
    }
    
    if (error.response?.status === 403 && 
        error.response.headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(error.response.headers['x-ratelimit-reset'] * 1000)
      error.rateLimitInfo = {
        reset: resetTime,
        remaining: error.response.headers['x-ratelimit-remaining'],
        limit: error.response.headers['x-ratelimit-limit']
      }
      
      console.warn(`GitHub API rate limit exceeded. Resets at: ${resetTime.toLocaleTimeString()}`)
    }
    
    return Promise.reject(error)
  }
)

export default api