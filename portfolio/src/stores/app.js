// src/stores/app.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // Simple visitor counter (would come from API in real app)
  const visitorCount = ref(0)
  const isLoading = ref(false)
  
  // Initialize visitor count
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-visitors')
    visitorCount.value = saved ? parseInt(saved) : 42 // Default seed
    
    // Increment on each visit (simulated)
    visitorCount.value++
    localStorage.setItem('portfolio-visitors', visitorCount.value.toString())
  }
  
  const setLoading = (loading) => {
    isLoading.value = loading
  }
  
  return {
    visitorCount,
    isLoading,
    setLoading
  }
})