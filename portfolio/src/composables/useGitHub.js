// src/composables/useGitHub.js
import { ref, computed } from 'vue'
import githubService from '@/services/githubService'

export function useGitHub() {
  const repos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const rateLimit = ref(null)

  const fetchRepos = async (options = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await githubService.getUserRepos(options)
      
      if (result.success) {
        repos.value = result.data
        const limit = await githubService.getRateLimit()
        rateLimit.value = limit
        return { success: true, data: result.data }
      } else {
        error.value = result.error
        return { success: false, error: result.error }
      }
    } catch (err) {
      error.value = { message: err.message || 'Network error', status: null }
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Filter out forks, archived, and disabled repos
  const filteredRepos = computed(() => {
    return repos.value.filter(repo => 
      !repo.fork && 
      !repo.archived && 
      !repo.disabled
    )
  })

  const getRepoByName = (name) => {
    return repos.value.find(repo => repo.name === name)
  }

  return {
    repos,
    filteredRepos,
    loading,
    error,
    rateLimit,
    fetchRepos,
    getRepoByName
  }
}