import { ref, computed } from 'vue'
import { useGitHub } from './useGitHub'
import { transformRepoToProject, sortProjects } from '@/utils/repoTransformer'
import { projects as staticProjects } from '@/data/projects'

export function useProjects() {
    const { filteredRepos, loading, error, fetchRepos } = useGitHub()
    const useFallback = ref(false)

    const transformedProjects = computed(() => {
        // If manually triggered fallback OR error with empty repos
        if (useFallback.value || (error.value && filteredRepos.value.length === 0)) {
            return staticProjects
        }

        // If we have GitHub repos, transform them
        if (filteredRepos.value.length > 0) {
            const githubProjects = filteredRepos.value.map(transformRepoToProject)
            return sortProjects(githubProjects)
        }

        // Default to static (initial state)
        return staticProjects
    })

    const featuredProjects = computed(() => {
        const projects = transformedProjects.value
        const featured = projects.filter(p => p.isFeatured)
        return featured.length > 0
            ? featured.slice(0, 3)
            : projects.slice(0, 3)
    })

    const techStacks = computed(() => {
        const allTech = transformedProjects.value.flatMap(p => p.tech)
        return [...new Set(allTech)].sort()
    })

    const getProjectBySlug = (slug) => {
        return transformedProjects.value.find(p => p.slug === slug)
    }

    const fetchProjects = async () => {
        const result = await fetchRepos({ limit: 20 })

        if (!result.success) {
            useFallback.value = true
        }

        return result
    }

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