// src/composables/useWeather.js
import { ref, computed } from 'vue';
import weatherService from '@/services/weatherService';

export function useWeather() {
  // State
  const weatherData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Computed
  const temperature = computed(() => {
    return weatherData.value?.temperature || null
  })

  const location = computed(() => {
    return weatherData.value?.location || null
  })

  const condition = computed(() => {
    return weatherData.value?.condition || null
  })

  // Actions
  async function fetchWeather(city) {
    // TODO: Implementasikan:
    // 1. set loading ke true
    loading.value = true;
    // 2. clear error
    error.value = null;
    // 3. panggil weatherService.getCurrentWeather dengan parameter city
    const result = await weatherService.getCurrentWeather(city);
    // 4. Handle response (error/success)
    if (result.success) {
      weatherData.value = result.data;
    } else {
      error.value = result.error.message;
      weatherData.value = null;
    }
    // 5. set loading ke false
    loading.value = false;
  }

  function clearWeather() {
    weatherData.value = null;
    error.value = null;
    loading.value = false;
  }

  // Return pulbic API
  return {
    // state
    weatherData,
    loading,
    error,

    // computed
    temperature,
    location,
    condition,

    // actions
    fetchWeather,
    clearWeather
  }
}