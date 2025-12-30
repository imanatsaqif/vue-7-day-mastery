<script setup>
import { useThemeStore } from '@/stores/theme'
import { RouterLink } from 'vue-router'
import { RouterView } from 'vue-router'

const themeStore = useThemeStore()
function toggleTheme() {
  themeStore.toggleTheme()
  console.log('Theme toggled to:', themeStore.isDark ? 'Dark' : 'Light')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface transition-colors duration-300">
    <nav class="sticky top-0 z-50 bg-surface-elevated shadow-lg">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="text-xl font-bold">
          <RouterLink to="/" class="text-text-primary hover:text-primary transition">
            Imana's Portfolio
          </RouterLink>
        </div>

        <div class="flex items-center space-x-6">
          <RouterLink v-for="route in [
            { name: 'home', label: 'Home' },
            { name: 'projects', label: 'Projects' },
            { name: 'about', label: 'About' },
            { name: 'contact', label: 'Contact' }
          ]" :key="route.name" :to="{ name: route.name }" class="text-text-secondary hover:text-primary transition"
            active-class="text-primary font-semibold">
            {{ route.label }}
          </RouterLink>

          <button @click="toggleTheme" class="p-2 rounded-full bg-control hover:bg-control-hover transition-colors"
            :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <span class="text-lg">{{ themeStore.themeIcon }}</span>
          </button>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8 grow">
      <RouterView />
    </main>

    <footer class="mt-12 py-6 bg-surface-elevated border-t border-border">
      <div class="container mx-auto px-4 text-center text-text-muted">
        <p>
          Built with Vue 3 & Pinia •
          {{ themeStore.isDark ? 'Dark' : 'Light' }} Mode Active
        </p>
      </div>
    </footer>
  </div>
</template>