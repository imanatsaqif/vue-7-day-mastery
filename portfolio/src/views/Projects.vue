<script setup>
import { useProjectsStore } from '@/stores/projects'
import { RouterLink } from 'vue-router'

const store = useProjectsStore()
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">My Projects</h1>
    
    <!-- Featured Projects Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Featured Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="project in store.featuredProjects"
          :key="project.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {{ project.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tech in project.tech" 
              :key="tech"
              class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {{ tech }}
            </span>
          </div>
          <RouterLink
            :to="{ name: 'project-detail', params: { slug: project.slug } }"
            class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </RouterLink>
        </div>
      </div>
    </section>
    
    <!-- All Projects Section -->
    <section>
      <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">All Projects</h2>
      <div class="space-y-4">
        <div 
          v-for="project in store.projects"
          :key="project.id"
          class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {{ project.tech.join(', ') }}
              </p>
            </div>
            <RouterLink
              :to="{ name: 'project-detail', params: { slug: project.slug } }"
              class="text-blue-600 dark:text-blue-400 hover:underline"
            >
              View →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>