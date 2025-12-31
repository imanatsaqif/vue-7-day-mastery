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
    getProjectBySlug,
    fetchProjects
  } = useProjects()

  // State
  const initialized = ref(false)
  const lastFetchTime = ref(null)

  // Computed
  const projects = computed(() => transformedProjects.value)
  const isLoading = computed(() => loading.value)

  // Actions
  const initProjects = async () => {
    if (initialized.value) return
    
    await fetchProjects()
    initialized.value = true
    lastFetchTime.value = new Date()
  }

  const refreshProjects = async () => {
    await fetchProjects()
    lastFetchTime.value = new Date()
  }

  return {
    // State
    initialized,
    lastFetchTime,
    
    // Computed
    projects,
    featuredProjects,
    techStacks,
    isLoading,
    
    // Error (if any)
    error,
    
    // Actions
    getProjectBySlug,
    initProjects,
    refreshProjects
  }
})