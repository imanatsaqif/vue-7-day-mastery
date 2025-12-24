import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkMode = ref(false)
  
  // Getters (computed)
  const themeClass = computed(() => isDarkMode.value ? 'dark' : 'light')
  const icon = computed(() => isDarkMode.value ? '🌙' : '☀️')
  
  // Actions
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    // Persist to localStorage
    localStorage.setItem('portfolio-theme', isDarkMode.value ? 'dark' : 'light')
  }
  
  function initializeTheme() {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) {
      isDarkMode.value = saved === 'dark'
    } else {
      // Check system preference
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
  
  return { isDarkMode, themeClass, icon, toggleTheme, initializeTheme }
})