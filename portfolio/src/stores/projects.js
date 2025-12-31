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

  const initialized = ref(false)
  const lastFetchTime = ref(null)

  const isLoading = computed(() => loading.value)
  const hasProjects = computed(() => projects.value.length > 0)
  const hasError = computed(() => error.value !== null)

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
    initialized,
    lastFetchTime,
    useFallback,
    projects,
    featuredProjects,
    techStacks,
    isLoading,
    hasProjects,
    hasError,
    error,
    getProjectBySlug,
    initProjects,
    refreshProjects,
    triggerFallback
  }
})