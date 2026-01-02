import { ref, watch } from 'vue'

export function useFavorites() {
  const favorites = ref([])

  // Load from localStorage
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('weather-favorites')
    favorites.value = saved ? JSON.parse(saved) : []
  }

  // Save to localStorage on changes
  watch(favorites, (newFavorites) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weather-favorites', JSON.stringify(newFavorites))
    }
  }, { deep: true })

  const addFavorite = (city) => {
    if (!city || favorites.value.includes(city)) return
    
    favorites.value = [city, ...favorites.value].slice(0, 10) // Limit to 10
  }

  const removeFavorite = (city) => {
    favorites.value = favorites.value.filter(fav => fav !== city)
  }

  const toggleFavorite = (city) => {
    if (isFavorite(city)) {
      removeFavorite(city)
    } else {
      addFavorite(city)
    }
  }

  const isFavorite = (city) => {
    return favorites.value.includes(city)
  }

  const clearFavorites = () => {
    favorites.value = []
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites
  }
}