import { defineStore } from 'pinia'
import { useWeather } from '@/composables/useWeather'
import { ref, watch, computed } from 'vue'
import weatherService from '@/services/weatherService'

export const useWeatherStore = defineStore('weather', () => {
    const weather = useWeather()

    // State tambahan
    const favorites = ref([])
    const favoriteWeatherCache = ref({}) // Cache untuk weather data favorites
    const unit = ref('metric')
    const searchResults = ref([])
    const searching = ref(false)
    const loadingFavorites = ref(false)

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
    watch(favorites, async (newFavorites, oldFavorites) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('weather-favorites', JSON.stringify(newFavorites))
        }
        
        // Update cache untuk favorites yang baru ditambahkan
        const newCities = newFavorites.filter(city => !oldFavorites.includes(city))
        if (newCities.length > 0) {
            await updateFavoriteWeatherCache(newCities)
        }
    }, { deep: true })

    // Update weather cache untuk favorites
    const updateFavoriteWeatherCache = async (cities = null) => {
        const citiesToUpdate = cities || favorites.value
        
        if (citiesToUpdate.length === 0) return
        
        loadingFavorites.value = true
        
        for (const city of citiesToUpdate) {
            try {
                // Extract city name dari format "City, Region, Country"
                const cityName = city.split(',')[0].trim()
                const result = await weatherService.getCurrentWeather(cityName)
                
                if (result.success) {
                    favoriteWeatherCache.value[city] = result.data
                }
            } catch (error) {
                console.error(`Failed to update weather for ${city}:`, error)
            }
        }
        
        loadingFavorites.value = false
    }

    // Refresh semua favorite weather data
    const refreshFavoriteWeather = async () => {
        await updateFavoriteWeatherCache()
    }

    // Actions
    const addFavorite = (city) => {
        if (!city || favorites.value.includes(city)) return
        favorites.value.push(city)
    }

    const removeFavorite = (city) => {
        favorites.value = favorites.value.filter(fav => fav !== city)
        // Hapus dari cache juga
        delete favoriteWeatherCache.value[city]
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

    const toggleUnit = () => {
        unit.value = unit.value === 'metric' ? 'imperial' : 'metric'
    }

    // Helper untuk mendapatkan temperature dengan unit yang benar
    const getTemperatureWithUnit = (weatherData) => {
        if (!weatherData?.temperature) return '--'
        
        let temp = weatherData.temperature
        if (unit.value === 'imperial') {
            temp = (temp * 9/5) + 32
        }
        return `${Math.round(temp)}°${unit.value === 'metric' ? 'C' : 'F'}`
    }

    // Helper untuk mendapatkan wind speed dengan unit yang benar
    const getWindSpeedWithUnit = (weatherData) => {
        if (!weatherData?.windSpeed) return '--'
        
        let speed = weatherData.windSpeed
        let unitText = 'km/h'
        
        if (unit.value === 'imperial') {
            speed = speed * 0.621371
            unitText = 'mph'
        }
        return `${Math.round(speed)} ${unitText}`
    }

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

    // Auto-refresh favorites saat store di-init
    if (typeof window !== 'undefined') {
        // Tunggu sedikit sebelum load favorites weather
        setTimeout(() => {
            if (favorites.value.length > 0) {
                updateFavoriteWeatherCache()
            }
        }, 1000)
    }

    return {
        // Re-export dari composable
        weatherData: weather.weatherData,
        loading: weather.loading,
        error: weather.error,

        // State tambahan
        favorites,
        favoriteWeatherCache,
        unit,
        searchResults,
        searching,
        loadingFavorites,

        // Computed properties
        temperature: weather.temperature,
        location: weather.location,
        condition: weather.condition,

        // Actions dari composable
        fetchWeather: weather.fetchWeather,
        clearWeather: weather.clearWeather,

        // Actions tambahan
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        toggleUnit,
        refreshFavoriteWeather,
        getTemperatureWithUnit,
        getWindSpeedWithUnit,

        // Search
        searchCities
    }
})