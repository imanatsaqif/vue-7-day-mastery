<script setup>
import { useProjectsStore } from '@/stores/projects'
import { RouterLink } from 'vue-router'

const store = useProjectsStore()
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-text-primary">My Projects</h1>

    <!-- Featured Projects Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 text-text-secondary">Featured Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="project in store.featuredProjects" :key="project.id"
          class="bg-surface-elevated rounded-xl shadow-lg p-6 hover-lift border border-border">
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
    <section>
      <h2 class="text-2xl font-semibold mb-6 text-text-secondary">All Projects</h2>
      <div class="space-y-4">
        <div v-for="project in store.projects" :key="project.id"
          class="bg-surface-elevated rounded-lg p-4 shadow hover:shadow-md transition">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-text-primary">
                {{ project.title }}
              </h3>
              <p class="text-text-muted text-sm mt-1">
                {{ project.tech.join(', ') }}
              </p>
            </div>
            <RouterLink :to="{ name: 'project-detail', params: { slug: project.slug } }"
              class="text-primary hover:underline">
              View →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>