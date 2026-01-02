<script setup>
import { ref, onMounted, computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
const cityInput = ref('')

const handleSearch = async () => {
    if (!cityInput.value.trim()) return
    await weatherStore.fetchWeather(cityInput.value)
    cityInput.value = ''
}

onMounted(() => {
    setTimeout(() => {
        weatherStore.fetchWeather('Jakarta')
    }, 100)
})

const displayTemperature = computed(() => {
    if (!weatherStore.weatherData?.temperature) return '--'
    
    let temp = weatherStore.weatherData.temperature
    if (weatherStore.unit === 'imperial') {
        temp = (temp * 9/5) + 32
    }
    return `${Math.round(temp)}°${weatherStore.unit === 'metric' ? 'C' : 'F'}`
})

const displayWindSpeed = computed(() => {
    if (!weatherStore.weatherData?.windSpeed) return '--'
    
    let speed = weatherStore.weatherData.windSpeed
    let unit = 'km/h'
    
    if (weatherStore.unit === 'imperial') {
        speed = speed * 0.621371
        unit = 'mph'
    }
    return `${Math.round(speed)} ${unit}`
})
</script>

<template>
    <div class="weather-container">
        <!-- Search Input -->
        <div class="search-box">
            <input
                v-model="cityInput"
                @keyup.enter="handleSearch"
                placeholder="Enter city name..."
                class="search-input"
            />
            <button @click="handleSearch" class="search-btn">
                Search
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="weatherStore.loading" class="loading">
            Loading weather data...
        </div>

        <!-- Error State -->
        <div v-else-if="weatherStore.error" class="error">
            Error: {{ weatherStore.error }}
        </div>

        <!-- Weather Data -->
        <div v-else-if="weatherStore.weatherData" class="weather-card">
            <h2 class="location-name">{{ weatherStore.weatherData.location }}</h2>
            
            <div class="temperature">{{ displayTemperature }}</div>
            <div class="condition">{{ weatherStore.weatherData.condition }}</div>
            
            <div class="additional-data">
                <div class="data-item">
                    <span class="label">Humidity:</span>
                    <span class="value">{{ weatherStore.weatherData.humidity }}%</span>
                </div>
                <div class="data-item">
                    <span class="label">Wind Speed:</span>
                    <span class="value">{{ displayWindSpeed }}</span>
                </div>
            </div>

            <!-- Actions -->
            <div class="actions">
                <button @click="weatherStore.toggleUnit" class="unit-btn">
                    Switch to {{ weatherStore.unit === 'metric' ? '°F' : '°C' }}
                </button>
                <button 
                    @click="weatherStore.addFavorite(weatherStore.weatherData.location)" 
                    class="favorite-btn"
                >
                    ★ Add to Favorites
                </button>
            </div>
        </div>

        <!-- Initial State -->
        <div v-else class="initial-state">
            <p>Enter a city name to see current weather</p>
            <button @click="weatherStore.fetchWeather('Jakarta')" class="try-btn">
                Try Jakarta
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Gunakan utility classes dari Tailwind v4 */
.weather-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.search-box {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.search-input {
    flex: 1;
    padding: 10px 12px;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    color: #0f172a;
    font-size: 14px;
    transition: all 0.3s ease;
}

.search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-btn {
    padding: 10px 20px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.search-btn:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
}

.weather-card {
    background-color: #f1f5f9;
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    border: 1px solid #f1f5f9;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.weather-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.location-name {
    color: #0f172a;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
}

.temperature {
    font-size: 48px;
    font-weight: 800;
    color: #0f172a;
    margin: 16px 0;
    line-height: 1;
}

.condition {
    font-size: 18px;
    color: #475569;
    margin-bottom: 24px;
}

.additional-data {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
}

.data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.label {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.value {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
}

.loading {
    text-align: center;
    padding: 48px 20px;
    color: #64748b;
    font-size: 16px;
}

.error {
    text-align: center;
    padding: 24px;
    background-color: #fee2e2;
    color: #dc2626;
    border-radius: 12px;
    border: 1px solid #fecaca;
    font-size: 14px;
}

.initial-state {
    text-align: center;
    padding: 40px 20px;
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid #f1f5f9;
}

.initial-state p {
    color: #64748b;
    margin-bottom: 16px;
    font-size: 16px;
}

.actions {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
}

.unit-btn, .favorite-btn, .try-btn {
    flex: 1;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.3s ease;
}

.unit-btn {
    background-color: #ffffff;
    color: #0f172a;
    border: 1px solid #e2e8f0;
}

.unit-btn:hover {
    background-color: #f8fafc;
    border-color: #3b82f6;
}

.favorite-btn {
    background-color: transparent;
    color: #3b82f6;
    border: 1px solid #3b82f6;
}

.favorite-btn:hover {
    background-color: #dbeafe;
}

.try-btn {
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
}

.try-btn:hover {
    background-color: #ffffff;
    border-color: #3b82f6;
}

/* Responsive */
@media (max-width: 640px) {
    .weather-container {
        padding: 16px;
    }
    
    .temperature {
        font-size: 40px;
    }
    
    .actions {
        flex-direction: column;
    }
}
</style>