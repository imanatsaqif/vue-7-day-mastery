<!-- src/views/ProjectDetail.vue -->
<script setup>
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { computed, onMounted, ref } from 'vue'

const route = useRoute()
const store = useProjectsStore()
const notFound = ref(false)

const project = computed(() => {
  const slug = route.params.slug
  if (typeof slug !== 'string') return null
  
  const found = store.getProjectBySlug(slug)
  if (!found) {
    notFound.value = true
  }
  return found
})

// Update page title when project is found
const updateTitle = () => {
  if (project.value) {
    document.title = `${project.value.title} | Imana's Portfolio`
  }
}

onMounted(() => {
  // Ensure projects are initialized
  if (!store.initialized) {
    store.initProjects().then(updateTitle)
  } else {
    updateTitle()
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="project" class="bg-surface-elevated rounded-2xl shadow-lg p-8">
      <div class="mb-6">
        <RouterLink to="/projects"
          class="inline-flex items-center text-primary hover:text-primary-hover transition-colors mb-4">
          ← Back to Projects
        </RouterLink>
        <h1 class="text-3xl font-bold text-text-primary">{{ project.title }}</h1>
        <p class="mt-4 text-lg text-text-secondary">{{ project.description }}</p>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-text-secondary">Technologies Used</h2>
        <div class="flex flex-wrap gap-3">
          <span v-for="tech in project.tech" :key="tech"
            class="px-4 py-2 bg-tech-gradient text-tech-text rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300">
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-border">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold mb-4 text-text-secondary">Project Status</h2>
            <div class="flex items-center space-x-4">
              <span class="px-4 py-2 bg-status text-status-text rounded-full">
                {{ project.isFeatured ? '⭐ Featured' : 'In Progress' }}
              </span>
              <span class="text-text-muted">
                {{ store.projects.length }} total projects in portfolio
              </span>
            </div>
          </div>
          
          <!-- GitHub Link if available -->
          <a v-if="project.repoData && !store.useFallback" 
             :href="project.repoData.url" 
             target="_blank"
             class="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-light transition">
            View on GitHub
          </a>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <div class="text-4xl mb-4">🔍</div>
      <h1 class="text-2xl font-semibold text-text-primary">Project Not Found</h1>
      <p class="mt-4 text-text-muted">
        {{ notFound ? 'The project you\'re looking for doesn\'t exist.' : 'Loading project...' }}
      </p>
      <RouterLink to="/projects"
        class="inline-block mt-6 px-6 py-3 bg-primary text-text-inverse rounded-lg hover:bg-primary-hover transition">
        Browse All Projects
      </RouterLink>
    </div>
  </div>
</template>