// src/stores/projects.js
import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useProjects } from "@/composables/useProjects"

export const useProjectsStore = defineStore("projects", () => {
  const {
    projects,
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
  const isLoading = computed(() => loading.value)
  const hasProjects = computed(() => projects.value.length > 0)
  const hasError = computed(() => error.value !== null)

  // Actions
  const initProjects = async () => {
    if (initialized.value) return
    
    await fetchProjects()
    initialized.value = true
    lastFetchTime.value = new Date()
  }

  const refreshProjects = async () => {
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
    
    // Error
    error,
    
    // Actions
    getProjectBySlug,
    initProjects,
    refreshProjects,
    triggerFallback
  }
})