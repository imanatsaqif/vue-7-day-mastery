<script setup>
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import { computed } from 'vue'

const route = useRoute()
const store = useProjectsStore()

const project = computed(() => {
  const slug = route.params.slug
  if (typeof slug !== 'string') return null
  return store.getProjectBySlug(slug)
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="project" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="mb-6">
        <RouterLink 
          to="/projects" 
          class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4"
        >
          ← Back to Projects
        </RouterLink>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ project.title }}</h1>
        <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">{{ project.description }}</p>
      </div>
      
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Technologies Used</h2>
        <div class="flex flex-wrap gap-3">
          <span 
            v-for="tech in project.tech" 
            :key="tech"
            class="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium"
          >
            {{ tech }}
          </span>
        </div>
      </div>
      
      <!-- Additional details section (preparing for API data) -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Project Status</h2>
        <div class="flex items-center space-x-4">
          <span class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
            {{ project.isFeatured ? '⭐ Featured' : 'In Progress' }}
          </span>
          <span class="text-gray-600 dark:text-gray-400">
            {{ store.projects.length }} total projects in portfolio
          </span>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-12">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Project Not Found</h1>
      <p class="mt-4 text-gray-600 dark:text-gray-400">The project you're looking for doesn't exist.</p>
      <RouterLink 
        to="/projects" 
        class="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Browse All Projects
      </RouterLink>
    </div>
  </div>
</template>