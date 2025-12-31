// src/stores/projects.js
import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useProjects } from "@/composables/useProjects"

export const useProjectsStore = defineStore("projects", () => {
  // Use our new composable
  const {
    projects: transformedProjects,
    featuredProjects,
    techStacks,
    loading,
    error,
    useFallback,
    getProjectBySlug,
    fetchProjects,
    triggerFallback
  } = useProjects()

  // State
  const initialized = ref(false)
  const lastFetchTime = ref(null)

  // Computed
  const projects = computed(() => {
    const projs = transformedProjects.value
    console.log('[Store] Projects count:', projs.length)
    console.log('[Store] Using fallback:', useFallback.value)
    return projs
  })
  
  const isLoading = computed(() => loading.value)
  
  const hasProjects = computed(() => projects.value.length > 0)
  const hasError = computed(() => error.value !== null)

  // Actions
  const initProjects = async () => {
    if (initialized.value && projects.value.length > 0) return
    
    console.log('[Store] Initializing projects...')
    const result = await fetchProjects()
    
    // If fetch failed AND we have no projects, trigger fallback
    if (!result.success && projects.value.length === 0) {
      console.log('[Store] Triggering fallback after failed init')
      triggerFallback()
    }
    
    initialized.value = true
    lastFetchTime.value = new Date()
  }

  const refreshProjects = async () => {
    console.log('[Store] Refreshing projects...')
    const result = await fetchProjects()
    lastFetchTime.value = new Date()
    return result
  }

  return {
    // State
    initialized,
    lastFetchTime,
    useFallback,
    
    // Computed
    projects,
    featuredProjects,
    techStacks,
    isLoading,
    hasProjects,
    hasError,
    
    // Error (if any)
    error,
    
    // Actions
    getProjectBySlug,
    initProjects,
    refreshProjects,
    triggerFallback
  }
})