<script setup>
import { onMounted } from 'vue'
import { useWeatherStore } from './stores/weather'
import CurrentWeather from './components/CurrentWeather.vue'
import FavoriteCitiesTable from './components/FavoriteCities.vue'

const weatherStore = useWeatherStore()

onMounted(() => {
  setTimeout(() => {
    if (!weatherStore.weatherData && weatherStore.favorites.length === 0) {
      weatherStore.fetchWeather('Jakarta')
    }
  }, 100)
})
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>🌤️ Weather Dashboard</h1>
      <p class="app-subtitle">Real-time weather with WeatherAPI.com</p>
    </header>

    <main class="app-main">
      <div class="current-weather-section">
        <CurrentWeather />
      </div>
      
      <div class="favorites-section">
        <FavoriteCitiesTable />
      </div>
    </main>

    <footer class="app-footer">
      <p>Data provided by <a href="https://www.weatherapi.com/" target="_blank">WeatherAPI.com</a></p>
    </footer>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #0f172a;
  font-family: system-ui, -apple-system, sans-serif;
}

.app-header {
  text-align: center;
  padding: 24px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.app-header h1 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #0f172a;
}

.app-subtitle {
  color: #64748b;
  font-size: 16px;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.current-weather-section, .favorites-section {
  width: 100%;
}

.app-footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 14px;
}

.app-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}
</style>