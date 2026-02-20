import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let nextId = 0

  const addToast = (message, type = 'success', duration = 3000) => {
    // If we hit the limit, remove the oldest toast instantly to make room
    if (toasts.value.length >= 3) {
      removeToast(toasts.value[0].id)
    }

    const id = nextId++
    const toast = { id, message, type }
    
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    addToast,
    removeToast
  }
})
