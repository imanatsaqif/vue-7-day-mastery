<!-- src/components/ApiStatus.vue -->
<script setup>
import { useProjectsStore } from '@/stores/projects'
import { computed } from 'vue'

const store = useProjectsStore()

const status = computed(() => {
  if (store.isLoading) return { text: 'Loading...', color: 'text-blue-500' }
  if (store.error) return { text: 'API Error', color: 'text-red-500' }
  if (!store.initialized) return { text: 'Ready', color: 'text-green-500' }
  return { 
    text: `Loaded ${store.projects.length} projects`, 
    color: 'text-green-500' 
  }
})
</script>

<template>
  <div class="fixed bottom-4 left-4 bg-surface-elevated p-3 rounded-lg shadow border border-border text-sm">
    <div class="flex items-center gap-2">
      <div class="w-2 h-2 rounded-full" :class="status.color.replace('text', 'bg')"></div>
      <span class="text-text-secondary">{{ status.text }}</span>
    </div>
    <div v-if="store.lastFetchTime" class="text-xs text-text-muted mt-1">
      Updated: {{ new Date(store.lastFetchTime).toLocaleTimeString() }}
    </div>
  </div>
</template>