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
    // If explicitly using fallback, return static projects
    if (useFallback.value) {
      return staticProjects
    }
    
    // If GitHub returned repos, transform them
    if (filteredRepos.value.length > 0) {
      const githubProjects = filteredRepos.value.map(transformRepoToProject)
      return sortProjects(githubProjects)
    }
    
    // No GitHub repos, return static fallback
    return staticProjects
  })

  // Featured projects
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
    
    // If fetch failed, trigger fallback
    if (!result.success) {
      useFallback.value = true
    }
    
    return result
  }

  // Manual fallback trigger
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
    triggerFallback
  }
}