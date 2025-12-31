// src/composables/useProjects.js
import { ref, computed } from 'vue'
import { useGitHub } from './useGitHub'
import { transformRepoToProject, sortProjects } from '@/utils/repoTransformer'
import { projects as staticProjects } from '@/data/projects'

export function useProjects() {
  const { filteredRepos, loading, error, fetchRepos } = useGitHub()
  const useFallback = ref(false)

  // Transform GitHub repos to projects
  const transformedProjects = computed(() => {
    if (useFallback.value) {
      return staticProjects
    }
    
    return sortProjects(filteredRepos.value.map(transformRepoToProject))
  })

  // Featured projects (first 3 featured or first 3 overall)
  const featuredProjects = computed(() => {
    const featured = transformedProjects.value.filter(p => p.isFeatured)
    return featured.length > 0 
      ? featured.slice(0, 3)
      : transformedProjects.value.slice(0, 3)
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
    
    if (!result.success) {
      console.warn('GitHub API failed, using fallback data')
      useFallback.value = true
    }
    
    return result
  }

  return {
    projects: transformedProjects,
    featuredProjects,
    techStacks,
    loading,
    error,
    useFallback,
    getProjectBySlug,
    fetchProjects
  }
}