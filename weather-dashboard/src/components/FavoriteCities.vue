<script setup>
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'

const weatherStore = useWeatherStore()

const loadFavorite = async (city) => {
  const cityName = city.split(',')[0].trim()
  await weatherStore.fetchWeather(cityName)
}

const refreshAll = async () => {
  await weatherStore.refreshFavoriteWeather()
}

// Format table data
const tableData = computed(() => {
  return weatherStore.favorites.map(city => {
    const weatherData = weatherStore.favoriteWeatherCache[city]
    
    return {
      city,
      weatherData,
      temperature: weatherStore.getTemperatureWithUnit(weatherData),
      condition: weatherData?.condition || '--',
      humidity: weatherData?.humidity ? `${weatherData.humidity}%` : '--',
      windSpeed: weatherStore.getWindSpeedWithUnit(weatherData),
      isLoading: !weatherData
    }
  })
})
</script>

<template>
  <div v-if="weatherStore.favorites.length > 0" class="favorites-table-container">
    <!-- Header -->
    <div class="favorites-header">
      <div class="header-left">
        <h3 class="favorites-title">⭐ Favorite Cities</h3>
        <span class="favorites-count">{{ weatherStore.favorites.length }} cities</span>
      </div>
      
      <div class="header-right">
        <button 
          @click="refreshAll" 
          class="refresh-btn"
          :disabled="weatherStore.loadingFavorites"
        >
          <span v-if="weatherStore.loadingFavorites" class="refresh-spinner"></span>
          {{ weatherStore.loadingFavorites ? 'Refreshing...' : '🔄 Refresh All' }}
        </button>
        
        <button 
          @click="weatherStore.favorites = []" 
          class="clear-all-btn"
          v-if="weatherStore.favorites.length > 0"
        >
          🗑️ Clear All
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="favorites-table">
        <thead>
          <tr>
            <th class="city-column">City</th>
            <th class="temp-column">Temperature</th>
            <th class="condition-column">Condition</th>
            <th class="humidity-column">Humidity</th>
            <th class="wind-column">Wind Speed</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="row in tableData" :key="row.city" class="table-row">
            <!-- City Column -->
            <td class="city-cell">
              <button @click="loadFavorite(row.city)" class="city-link">
                {{ row.city }}
              </button>
            </td>
            
            <!-- Temperature Column -->
            <td class="temp-cell">
              <div v-if="row.isLoading" class="loading-cell">
                <div class="loading-dots"></div>
              </div>
              <div v-else class="temperature-display">
                {{ row.temperature }}
              </div>
            </td>
            
            <!-- Condition Column -->
            <td class="condition-cell">
              <div v-if="row.isLoading" class="loading-cell">
                <div class="loading-dots"></div>
              </div>
              <div v-else class="condition-display">
                {{ row.condition }}
              </div>
            </td>
            
            <!-- Humidity Column -->
            <td class="humidity-cell">
              <div v-if="row.isLoading" class="loading-cell">
                <div class="loading-dots"></div>
              </div>
              <div v-else class="humidity-display">
                {{ row.humidity }}
              </div>
            </td>
            
            <!-- Wind Speed Column -->
            <td class="wind-cell">
              <div v-if="row.isLoading" class="loading-cell">
                <div class="loading-dots"></div>
              </div>
              <div v-else class="wind-display">
                {{ row.windSpeed }}
              </div>
            </td>
            
            <!-- Actions Column -->
            <td class="actions-cell">
              <div class="action-buttons">
                <button 
                  @click="loadFavorite(row.city)" 
                  class="view-btn"
                  title="View Weather"
                >
                  👁️ View
                </button>
                
                <button 
                  @click="weatherStore.removeFavorite(row.city)" 
                  class="remove-btn"
                  title="Remove from Favorites"
                >
                  ★ Remove
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Loading State -->
      <div v-if="weatherStore.loadingFavorites && weatherStore.favorites.length > 0" class="table-loading">
        <div class="loading-spinner"></div>
        <p>Updating weather data for favorites...</p>
      </div>
      
      <!-- Empty Cache State -->
      <div v-if="!weatherStore.loadingFavorites && tableData.every(row => row.isLoading)" class="table-empty-cache">
        <p>No weather data available. Click "Refresh All" to update.</p>
      </div>
    </div>
    
    <!-- Unit Toggle -->
    <div class="table-footer">
      <div class="unit-toggle">
        <span class="unit-label">Units:</span>
        <button @click="weatherStore.toggleUnit" class="unit-toggle-btn">
          {{ weatherStore.unit === 'metric' ? '°C, km/h' : '°F, mph' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-table-container {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.favorites-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.favorites-count {
  font-size: 14px;
  color: #64748b;
  background-color: #f1f5f9;
  padding: 4px 10px;
  border-radius: 20px;
}

.header-right {
  display: flex;
  gap: 12px;
}

.refresh-btn, .clear-all-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 6px;
}

.refresh-btn:hover {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clear-all-btn:hover {
  background-color: #ef4444;
  color: white;
  border-color: #ef4444;
}

.refresh-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Table Styles */
.table-responsive {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.favorites-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.favorites-table th {
  background-color: #f8fafc;
  padding: 16px 12px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}

.favorites-table td {
  padding: 16px 12px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.table-row:hover {
  background-color: #f8fafc;
}

/* Column Widths */
.city-column { width: 25%; }
.temp-column { width: 15%; }
.condition-column { width: 20%; }
.humidity-column { width: 15%; }
.wind-column { width: 15%; }
.actions-column { width: 10%; }

/* Cell Styles */
.city-link {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 14px;
}

.city-link:hover {
  text-decoration: underline;
}

.temperature-display {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.condition-display {
  font-size: 14px;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 8px;
}

.humidity-display, .wind-display {
  font-size: 14px;
  color: #64748b;
}

/* Loading States */
.loading-cell {
  height: 24px;
  display: flex;
  align-items: center;
}

.loading-dots {
  width: 40px;
  height: 8px;
  background: linear-gradient(90deg, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.view-btn, .remove-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.view-btn {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
}

.view-btn:hover {
  background-color: #2563eb;
}

.remove-btn {
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #fecaca;
}

.remove-btn:hover {
  background-color: #fee2e2;
}

/* Footer */
.table-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.unit-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
}

.unit-label {
  font-size: 14px;
  color: #64748b;
}

.unit-toggle-btn {
  padding: 6px 12px;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.unit-toggle-btn:hover {
  background-color: #e2e8f0;
  border-color: #cbd5e1;
}

/* Loading/Empty States */
.table-loading, .table-empty-cache {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #64748b;
}

.table-loading .loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

/* Responsive */
@media (max-width: 1024px) {
  .favorites-table-container {
    padding: 16px;
  }
  
  .favorites-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-left, .header-right {
    width: 100%;
  }
  
  .header-right {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .favorites-title {
    font-size: 18px;
  }
  
  .refresh-btn, .clear-all-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
  
  .view-btn, .remove-btn {
    width: 100%;
  }
}
</style>