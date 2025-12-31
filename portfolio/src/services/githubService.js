// src/services/githubService.js
import api from './api'

class GithubService {
  constructor(username) {
    this.username = username || import.meta.env.VITE_GITHUB_USERNAME
  }

  async getUserRepos(options = {}) {
    try {
      const params = {
        sort: 'updated',
        direction: 'desc',
        per_page: options.limit || 30, // Reduced from 50 to 30
        page: options.page || 1,
        ...options
      }

      const response = await api.get(`/users/${this.username}/repos`, { params })
      return {
        success: true,
        data: response.data,
        headers: response.headers
      }
    } catch (error) {
      // Better error extraction
      const errorData = {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        isRateLimit: error.response?.status === 403
      }
      
      if (errorData.isRateLimit) {
        const resetTime = new Date(error.response.headers['x-ratelimit-reset'] * 1000)
        errorData.rateLimitReset = resetTime
        errorData.rateLimitRemaining = error.response.headers['x-ratelimit-remaining']
      }
      
      return {
        success: false,
        error: errorData
      }
    }
  }

  async getRepo(repoName) {
    try {
      const response = await api.get(`/repos/${this.username}/${repoName}`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: {
          status: error.response?.status,
          message: error.response?.data?.message || error.message
        }
      }
    }
  }

  async getRateLimit() {
    try {
      const response = await api.get('/rate_limit')
      return response.data.resources.core
    } catch (error) {
      return { limit: 60, used: 0, remaining: 60, reset: 0 } // Fallback
    }
  }
}

export default new GithubService()