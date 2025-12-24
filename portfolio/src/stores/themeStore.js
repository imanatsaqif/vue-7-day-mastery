// src/stores/themeStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', {
  // State
  state: () => ({
    mode: 'light', // 'light' or 'dark'
    systemPreference: true // Follow OS preference
  }),

  // Getters (computed values)
  getters: {
    isDark: (state) => state.mode === 'dark',
    themeClass: (state) => state.mode,
    
    // Complex getter with parameters
    textColor: (state) => {
      return state.mode === 'dark' ? 'text-gray-100' : 'text-gray-900'
    }
  },

  // Actions (methods)
  actions: {
    toggleTheme() {
      this.mode = this.mode === 'light' ? 'dark' : 'light'
      this.updateDocumentClass()
    },

    setTheme(mode) {
      if (['light', 'dark'].includes(mode)) {
        this.mode = mode
        this.updateDocumentClass()
      }
    },

    updateDocumentClass() {
      if (this.mode === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    detectSystemTheme() {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setTheme('dark')
      } else {
        this.setTheme('light')
      }
    }
  },

  // Persistence configuration
  persist: {
    key: 'portfolio-theme',
    paths: ['mode', 'systemPreference']
  }
})