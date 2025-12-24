<script setup>
import { useProjectsStore } from '@/stores/projects'
import { useAppStore } from '@/stores/app'

const projectsStore = useProjectsStore()
const appStore = useAppStore()
console.log(projectsStore.techStacks)
</script>

<template>
  <div class="text-center">
    <h1 class="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
      Welcome to My Portfolio
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
      Built with Vue 3, Pinia State Management, and Tailwind CSS
    </p>
    
    <!-- Stats from stores -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {{ projectsStore.projects.length }}
        </div>
        <div class="text-gray-600 dark:text-gray-400 mt-2">Total Projects</div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div class="text-3xl font-bold text-green-600 dark:text-green-400">
          {{ projectsStore.techStacks.length }}
        </div>
        <div class="text-gray-600 dark:text-gray-400 mt-2">Technologies</div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
          {{ appStore.visitorCount }}
        </div>
        <div class="text-gray-600 dark:text-gray-400 mt-2">Visitors</div>
      </div>
    </div>
    
    <!-- Quick links -->
    <div class="space-x-4">
      <RouterLink
        to="/projects"
        class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        View Projects
      </RouterLink>
      <RouterLink
        to="/contact"
        class="inline-block px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold"
      >
        Get in Touch
      </RouterLink>
    </div>
  </div>
</template>