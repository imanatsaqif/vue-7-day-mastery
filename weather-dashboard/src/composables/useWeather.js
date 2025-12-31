import { ref, computed } from 'vue'
import weatherService from '@/services/weatherService'

export function useWeather() {
  // State
  const weatherData = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const units = ref('metric') // 'metric' or 'imperial'
  const currentCity = ref('')
  const searchTimeout = ref(null)

  // Computed properties
  const temperature = computed(() => {
    if (!weatherData.value?.current) return null
    return units.value === 'metric' 
      ? Math.round(weatherData.value.current.temp_c)
      : Math.round(weatherData.value.current.temp_f)
  })

  const feelsLike = computed(() => {
    if (!weatherData.value?.current) return null
    return units.value === 'metric'
      ? Math.round(weatherData.value.current.feelslike_c)
      : Math.round(weatherData.value.current.feelslike_f)
  })

  const windSpeed = computed(() => {
    if (!weatherData.value?.current) return null
    return units.value === 'metric'
      ? Math.round(weatherData.value.current.wind_kph)
      : Math.round(weatherData.value.current.wind_mph)
  })

  const temperatureUnit = computed(() => units.value === 'metric' ? '°C' : '°F')
  const speedUnit = computed(() => units.value === 'metric' ? 'km/h' : 'mph')
  const pressureUnit = computed(() => units.value === 'metric' ? 'mb' : 'in')

  // Actions
  const fetchWeather = async (city) => {
    if (!city?.trim()) return

    loading.value = true
    error.value = null
    currentCity.value = city.trim()

    try {
      const result = await weatherService.getCurrentWeather(currentCity.value, 3)
      
      if (result.success) {
        weatherData.value = result.data
      } else {
        error.value = result.error
        weatherData.value = null
      }
    } catch (err) {
      error.value = { message: 'Failed to fetch weather data' }
      weatherData.value = null
    } finally {
      loading.value = false
    }
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    loading.value = true
    error.value = null

    try {
      const result = await weatherService.getWeatherByCoords(lat, lon, 3)
      
      if (result.success) {
        weatherData.value = result.data
        currentCity.value = result.data.location.name
      } else {
        error.value = result.error
        weatherData.value = null
      }
    } catch (err) {
      error.value = { message: 'Failed to fetch weather by location' }
      weatherData.value = null
    } finally {
      loading.value = false
    }
  }

  const searchCities = async (query) => {
    if (!query || query.length < 2) return []

    // Debounce search
    clearTimeout(searchTimeout.value)
    
    return new Promise((resolve) => {
      searchTimeout.value = setTimeout(async () => {
        const result = await weatherService.searchCities(query)
        resolve(result.success ? result.data : [])
      }, 300)
    })
  }

  const toggleUnits = () => {
    units.value = units.value === 'metric' ? 'imperial' : 'metric'
  }

  const getWeatherBackground = () => {
    if (!weatherData.value?.current?.condition) return 'bg-gradient-sunny'
    
    const condition = weatherData.value.current.condition.text.toLowerCase()
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return 'bg-gradient-sunny'
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'bg-gradient-rainy'
    } else if (condition.includes('cloud')) {
      return 'bg-gradient-cloudy'
    } else if (condition.includes('snow')) {
      return 'bg-gradient-to-br from-blue-100 to-blue-300'
    }
    
    return 'bg-gradient-to-br from-gray-100 to-gray-300'
  }

  const clearWeather = () => {
    weatherData.value = null
    error.value = null
    currentCity.value = ''
  }

  return {
    // State
    weatherData,
    loading,
    error,
    units,
    currentCity,
    
    // Computed
    temperature,
    feelsLike,
    windSpeed,
    temperatureUnit,
    speedUnit,
    pressureUnit,
    
    // Actions
    fetchWeather,
    fetchWeatherByCoords,
    searchCities,
    toggleUnits,
    getWeatherBackground,
    clearWeather
  }
}