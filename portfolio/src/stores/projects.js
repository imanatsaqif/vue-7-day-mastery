// src/stores/projects.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { projects as initialProjects } from "@/data/projects";

export const useProjectsStore = defineStore("projects", () => {
    // State
    const projects = ref(initialProjects);
    const isLoading = ref(false);

    // Getters (computed)
    const featuredProjects = computed(() =>
        projects.value.filter(p => p.isFeatured).slice(0, 3)
    )

    const techStacks = computed(() => {
        const allTech = projects.value.flatMap(p => p.tech);
        return [...new Set(allTech)]
    });

    // Actions
    const getProjectBySlug = (slug) => {
        return projects.value.find(p => p.slug === slug)
    }

    const fetchProjects = async () => {
        isLoading.value = true
        try {
            // Simulate fetching data
            await new Promise(resolve => setTimeout(resolve, 500));
            projects.value = initialProjects;
        } finally {
            isLoading.value = false
        }
    }

    return {
        projects,
        isLoading,
        featuredProjects,
        techStacks,
        getProjectBySlug,
        fetchProjects
    }
});