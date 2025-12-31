// src/composables/useGitHub.js
import { ref, computed } from 'vue'
import githubService from '@/services/githubService'

export function useGitHub() {
  const repos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const rateLimit = ref(null)

  // Fetch repositories
  const fetchRepos = async (options = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await githubService.getUserRepos(options)
      
      if (result.success) {
        repos.value = result.data
      } else {
        error.value = result.error
        throw new Error(result.error.message)
      }
      
      // Get rate limit after successful request
      const limit = await githubService.getRateLimit()
      rateLimit.value = limit
      
      return result
    } catch (err) {
      console.error('[useGitHub] Fetch error:', err)
      error.value = err
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Filtered repos - exclude forks, archived, etc.
  const filteredRepos = computed(() => {
    return repos.value.filter(repo => 
      !repo.fork && 
      !repo.archived && 
      !repo.disabled
    )
  })

  // Get specific repo by name
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