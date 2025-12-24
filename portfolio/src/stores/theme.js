import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref(false)
  
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
  
  // Getters (computed)
  const themeClass = computed(() => isDark.value ? 'dark' : 'light')
  const themeIcon = computed(() => isDark.value ? '🌙' : '☀️')
  
  // Actions
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }
  
  // Watch for changes to persist
  watch(isDark, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', newValue ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newValue)
    }
  }, { immediate: true })
  
  return {
    isDark,
    themeClass,
    themeIcon,
    toggleTheme
  }
})