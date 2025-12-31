import api from './api'

class GithubService {
  constructor(username) {
    this.username = username || import.meta.env.VITE_GITHUB_USERNAME
  }

  // Get user's public repos
  async getUserRepos(options = {}) {
    try {
      const params = {
        sort: 'updated',
        direction: 'desc',
        per_page: options.limit || 50,
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
      return {
        success: false,
        error: {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          isRateLimit: error.response?.status === 403
        }
      }
    }
  }

  // Get specific repo details
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

  // Get rate limit status
  async getRateLimit() {
    try {
      const response = await api.get('/rate_limit')
      return response.data.resources.core
    } catch (error) {
      return null
    }
  }
}

export default new GithubService()