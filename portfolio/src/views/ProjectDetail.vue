<script setup>
    import { projects } from '../data/projects';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();
    const project = computed(() => {
      const slug = route.params.slug;

      if (typeof slug !== 'string') {
        return null;
      }
      return projects.find(p => p.slug === slug) || null;
    });
    
</script>

<template>
  <section v-if="project" class="mx-auto">
    <h1>{{ project.title }}</h1>
    <p class="mt-4">{{ project.description }}</p>
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Technologies Used:</h2>
      <ul class="list-disc list-inside">
        <li v-for="tech in project.tech" :key="tech">{{ tech }}</li>
      </ul>
    </div>
  </section>
  <section v-else class="text-center">
    <h1 class="text-2xl font-semibold">Project Not Found</h1>
    <p class="mt-4">The project you are looking for does not exist.</p>
  </section>
</template>