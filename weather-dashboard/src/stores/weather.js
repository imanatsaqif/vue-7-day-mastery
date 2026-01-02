// src/stores/weather.js
import { defineStore } from 'pinia'
import { useWeather } from '@/composables/useWeather'
import { ref, watch } from 'vue'
import weatherService from '@/services/weatherService'

export const useWeatherStore = defineStore('weather', () => {
    const weather = useWeather()

    // State tambahan
    const favorites = ref([])
    const unit = ref('metric')
    const searchResults = ref([])
    const searching = ref(false)

    // Load favorites dari localStorage
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('weather-favorites')
        if (saved) {
            try {
                favorites.value = JSON.parse(saved)
            } catch (e) {
                console.error('Failed to parse favorites:', e)
            }
        }
    }

    // Save to localStorage
    watch(favorites, (newFavorites) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('weather-favorites', JSON.stringify(newFavorites))
        }
    }, { deep: true })

    // Actions
    const addFavorite = (city) => {
        if (!city || favorites.value.includes(city)) return
        favorites.value.push(city)
    }

    const removeFavorite = (city) => {
        favorites.value = favorites.value.filter(fav => fav !== city)
    }

    const toggleUnit = () => {
        unit.value = unit.value === 'metric' ? 'imperial' : 'metric'
    }

    // Debug: Log state changes
    watch(() => weather.weatherData.value, (newData) => {
        console.log('Weather data in store:', newData)
    })

    const searchCities = async (query) => {
        if (!query || query.length < 3) {
            searchResults.value = []
            return
        }

        searching.value = true
        const result = await weatherService.searchCities(query)

        if (result.success) {
            searchResults.value = result.data
        } else {
            searchResults.value = []
            console.error('Search error:', result.error)
        }

        searching.value = false
    }

    return {
        // Re-export dari composable
        weatherData: weather.weatherData,
        loading: weather.loading,
        error: weather.error,

        // State tambahan
        favorites,
        unit,

        // Computed properties dari composable
        // Catatan: Ini computed, bukan ref!
        temperature: weather.temperature,
        location: weather.location,
        condition: weather.condition,

        // Actions dari composable
        fetchWeather: weather.fetchWeather,
        clearWeather: weather.clearWeather,

        // Actions tambahan
        addFavorite,
        removeFavorite,
        toggleUnit,

        // Search
        searchResults,
        searching,
        searchCities
    }
})