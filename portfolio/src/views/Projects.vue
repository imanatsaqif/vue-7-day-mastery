<script setup>
import { useProjectsStore } from '@/stores/projects'
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'

const store = useProjectsStore()

onMounted(() => {
  if (!store.initialized) {
    store.initProjects()
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- Loading State -->
    <div v-if="store.isLoading" class="space-y-8">
      <div>
        <div class="h-8 bg-surface-muted rounded-lg w-48 mb-6 animate-pulse"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" 
               class="bg-surface-elevated rounded-xl p-6 border border-border">
            <div class="h-6 bg-surface-muted rounded w-3/4 mb-3 animate-pulse"></div>
            <div class="h-4 bg-surface-muted rounded w-full mb-2 animate-pulse"></div>
            <div class="h-4 bg-surface-muted rounded w-5/6 mb-4 animate-pulse"></div>
            <div class="flex gap-2 mb-4">
              <div class="h-6 bg-surface-muted rounded-full w-16 animate-pulse"></div>
              <div class="h-6 bg-surface-muted rounded-full w-20 animate-pulse"></div>
            </div>
            <div class="h-9 bg-surface-muted rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="store.error" class="text-center py-12">
      <div class="text-4xl mb-4">⚠️</div>
      <h2 class="text-2xl font-bold text-text-primary mb-2">Unable to Load Projects</h2>
      <p class="text-text-muted mb-6">
        {{ store.error.message || 'GitHub API request failed' }}
      </p>
      <button @click="store.refreshProjects"
              class="px-6 py-3 bg-primary text-text-inverse rounded-lg hover:bg-primary-hover transition">
        Retry
      </button>
      <p class="mt-4 text-sm text-text-muted">
        Showing static portfolio projects as fallback
      </p>
    </div>

    <!-- Success State -->
    <div v-else>
      <h1 class="text-4xl font-bold mb-8 text-text-primary">My Projects</h1>
      
      <!-- Featured Projects Section -->
      <section class="mb-12" v-if="store.featuredProjects.length > 0">
        <h2 class="text-2xl font-semibold mb-6 text-text-secondary">Featured Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="project in store.featuredProjects" :key="project.id"
               class="bg-surface-elevated rounded-xl shadow-lg p-6 hover-lift border border-border">
            <!-- GitHub Stats Badge -->
            <div v-if="project.repoData" class="flex items-center justify-between mb-3">
              <a :href="project.repoData.url" target="_blank" 
                 class="text-xs text-primary hover:text-primary-hover transition">
                View on GitHub →
              </a>
            </div>
            
            <h3 class="text-xl font-bold mb-2 text-text-primary">
              {{ project.title }}
            </h3>
            <p class="text-text-muted mb-4">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tech in project.tech" :key="tech"
                    class="px-3 py-1 bg-chip text-chip-text rounded-full text-sm">
                {{ tech }}
              </span>
            </div>
            <RouterLink :to="{ name: 'project-detail', params: { slug: project.slug } }"
                       class="inline-block px-4 py-2 bg-primary text-text-inverse rounded-lg hover:bg-primary-hover transition">
              View Details
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- All Projects Section -->
      <section v-if="store.projects.length > 0">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-text-secondary">All Projects</h2>
          <span class="text-text-muted text-sm">
            {{ store.projects.length }} projects
          </span>
        </div>
        <div class="space-y-4">
          <div v-for="project in store.projects" :key="project.id"
               class="bg-surface-elevated rounded-lg p-4 shadow hover:shadow-md transition">
            <div class="flex justify-between items-center">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="text-lg font-semibold text-text-primary">
                    {{ project.title }}
                  </h3>
                  <span v-if="project.isFeatured" 
                        class="text-xs px-2 py-1 bg-primary-light text-primary rounded-full">
                    Featured
                  </span>
                </div>
                <p class="text-text-muted text-sm">
                  {{ project.tech.join(', ') }}
                </p>
              </div>
              <div class="flex items-center gap-4">
                <RouterLink :to="{ name: 'project-detail', params: { slug: project.slug } }"
                           class="text-primary hover:text-primary-hover transition">
                  View →
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-4xl mb-4">📂</div>
        <h2 class="text-2xl font-bold text-text-primary mb-2">No Projects Found</h2>
        <p class="text-text-muted">Check back later for new projects!</p>
      </div>
    </div>
  </div>
</template>