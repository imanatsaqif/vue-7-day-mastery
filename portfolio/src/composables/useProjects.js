// src/composables/useProjects.js
import { ref, computed } from 'vue'
import { useGitHub } from './useGitHub'
import { transformRepoToProject, sortProjects } from '@/utils/repoTransformer'
import { projects as staticProjects } from '@/data/projects'

export function useProjects() {
  const { filteredRepos, loading, error, fetchRepos } = useGitHub()
  const useFallback = ref(false)

  // Transform GitHub repos to projects OR use fallback
  const transformedProjects = computed(() => {
    console.log('[useProjects] useFallback:', useFallback.value)
    console.log('[useProjects] filteredRepos:', filteredRepos.value.length)
    
    if (useFallback.value) {
      console.log('[useProjects] Using fallback data:', staticProjects)
      return staticProjects
    }
    
    const githubProjects = filteredRepos.value.map(transformRepoToProject)
    console.log('[useProjects] GitHub projects:', githubProjects.length)
    
    // If GitHub returned empty (network error) but we haven't triggered fallback yet
    if (githubProjects.length === 0 && error.value) {
      console.log('[useProjects] Empty GitHub data with error, using fallback')
      return staticProjects
    }
    
    return sortProjects(githubProjects)
  })

  // Featured projects (first 3 featured or first 3 overall)
  const featuredProjects = computed(() => {
    const projects = transformedProjects.value
    const featured = projects.filter(p => p.isFeatured)
    return featured.length > 0 
      ? featured.slice(0, 3)
      : projects.slice(0, 3)
  })

  // All unique technologies
  const techStacks = computed(() => {
    const allTech = transformedProjects.value.flatMap(p => p.tech)
    return [...new Set(allTech)].sort()
  })

  // Get project by slug
  const getProjectBySlug = (slug) => {
    return transformedProjects.value.find(p => p.slug === slug)
  }

  // Fetch with fallback logic
  const fetchProjects = async () => {
    const result = await fetchRepos({ limit: 20 })
    
    if (!result.success || (result.success && filteredRepos.value.length === 0)) {
      console.warn('GitHub API failed or returned empty, using fallback data')
      useFallback.value = true
    }
    
    return result
  }

  // Manual fallback trigger (for testing)
  const triggerFallback = () => {
    useFallback.value = true
  }

  return {
    projects: transformedProjects,
    featuredProjects,
    techStacks,
    loading,
    error,
    useFallback,
    getProjectBySlug,
    fetchProjects,
    triggerFallback  // For testing
  }
}