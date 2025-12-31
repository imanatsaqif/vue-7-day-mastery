<script setup>
import { useProjectsStore } from '@/stores/projects'
import { useAppStore } from '@/stores/app'
import { onMounted } from 'vue'

const projectsStore = useProjectsStore()
const appStore = useAppStore()

onMounted(() => {
  projectsStore.initProjects()
})
</script>

<template>
  <div class="text-center">
    <h1 class="text-5xl font-bold mb-6 text-text-primary">
      Welcome to My Portfolio
    </h1>
    <p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
      Built with Vue 3, Pinia State Management, and Tailwind CSS
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
      <div class="bg-surface-elevated p-6 rounded-xl shadow border border-border">
        <div class="text-3xl font-bold text-primary">{{ projectsStore.projects.length }}</div>
        <div class="text-text-muted mt-2">Total Projects</div>
      </div>
      <div class="bg-surface-elevated p-6 rounded-xl shadow">
        <div class="text-3xl font-bold text-text-secondary">{{ projectsStore.techStacks.length }}</div>
        <div class="text-text-muted mt-2">Technologies</div>
      </div>
      <div class="bg-surface-elevated p-6 rounded-xl shadow">
        <div class="text-3xl font-bold text-text-secondary">{{ appStore.visitorCount }}</div>
        <div class="text-text-muted mt-2">Visitors</div>
      </div>
    </div>
    
    <div class="space-x-4">
      <RouterLink to="/projects"
        class="inline-block px-8 py-3 bg-primary text-text-inverse rounded-lg hover:bg-primary-hover transition font-semibold">
        View Projects
      </RouterLink>
      <RouterLink to="/contact"
        class="inline-block px-8 py-3 border-2 border-border text-text-primary rounded-lg hover:bg-surface-muted transition font-semibold">
        Get in Touch
      </RouterLink>
    </div>
  </div>
</template>