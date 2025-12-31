import api from './api'

class WeatherService {
  constructor() {
    this.cache = new Map()
    this.cacheDuration = 10 * 60 * 1000 // 10 minutes
  }

  // Get current weather by city
  async getCurrentWeather(city, days = 1) {
    const cacheKey = `current_${city}_${days}`
    
    // Check cache first
    const cached = this.getFromCache(cacheKey)
    if (cached) {
      console.log('[WeatherService] Using cached data for:', city)
      return cached
    }

    try {
      const response = await api.get('/forecast.json', {
        params: {
          q: city,
          days: days,
          aqi: 'yes',
          alerts: 'yes'
        }
      })

      const result = {
        success: true,
        data: this.transformCurrentWeather(response.data)
      }

      // Cache the result
      this.setToCache(cacheKey, result)
      return result

    } catch (error) {
      return {
        success: false,
        error: {
          status: error.response?.status,
          message: error.message || 'Failed to fetch weather data',
          originalError: error
        }
      }
    }
  }

  // Get weather by coordinates
  async getWeatherByCoords(lat, lon, days = 1) {
    const cacheKey = `coords_${lat}_${lon}_${days}`
    
    const cached = this.getFromCache(cacheKey)
    if (cached) return cached

    try {
      const response = await api.get('/forecast.json', {
        params: {
          q: `${lat},${lon}`,
          days: days,
          aqi: 'yes',
          alerts: 'yes'
        }
      })

      const result = {
        success: true,
        data: this.transformCurrentWeather(response.data)
      }

      this.setToCache(cacheKey, result)
      return result

    } catch (error) {
      return {
        success: false,
        error: {
          status: error.response?.status,
          message: error.message || 'Failed to fetch weather by coordinates'
        }
      }
    }
  }

  // Search for cities (autocomplete)
  async searchCities(query) {
    if (!query || query.length < 2) return { success: true, data: [] }

    try {
      const response = await api.get('/search.json', {
        params: { q: query }
      })

      return {
        success: true,
        data: response.data.map(city => ({
          name: city.name,
          region: city.region,
          country: city.country,
          lat: city.lat,
          lon: city.lon
        }))
      }

    } catch (error) {
      return {
        success: false,
        error: {
          status: error.response?.status,
          message: 'Failed to search cities'
        }
      }
    }
  }

  // Transform WeatherAPI response to our format
  transformCurrentWeather(data) {
    return {
      location: {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
        localtime: data.location.localtime
      },
      current: {
        temp_c: data.current.temp_c,
        temp_f: data.current.temp_f,
        condition: {
          text: data.current.condition.text,
          icon: data.current.condition.icon,
          code: data.current.condition.code
        },
        wind_kph: data.current.wind_kph,
        wind_mph: data.current.wind_mph,
        wind_dir: data.current.wind_dir,
        pressure_mb: data.current.pressure_mb,
        pressure_in: data.current.pressure_in,
        precip_mm: data.current.precip_mm,
        precip_in: data.current.precip_in,
        humidity: data.current.humidity,
        cloud: data.current.cloud,
        feelslike_c: data.current.feelslike_c,
        feelslike_f: data.current.feelslike_f,
        uv: data.current.uv,
        gust_kph: data.current.gust_kph,
        gust_mph: data.current.gust_mph
      },
      forecast: {
        forecastday: data.forecast?.forecastday.map(day => ({
          date: day.date,
          date_epoch: day.date_epoch,
          day: {
            maxtemp_c: day.day.maxtemp_c,
            maxtemp_f: day.day.maxtemp_f,
            mintemp_c: day.day.mintemp_c,
            mintemp_f: day.day.mintemp_f,
            avgtemp_c: day.day.avgtemp_c,
            avgtemp_f: day.day.avgtemp_f,
            maxwind_kph: day.day.maxwind_kph,
            maxwind_mph: day.day.maxwind_mph,
            totalprecip_mm: day.day.totalprecip_mm,
            totalprecip_in: day.day.totalprecip_in,
            avgvis_km: day.day.avgvis_km,
            avgvis_miles: day.day.avgvis_miles,
            avghumidity: day.day.avghumidity,
            condition: day.day.condition,
            uv: day.day.uv
          },
          astro: day.astro,
          hour: day.hour
        })) || []
      },
      aqi: data.current?.air_quality || null,
      alerts: data.alerts?.alert || []
    }
  }

  // Cache management
  getFromCache(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.cacheDuration) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  setToCache(key, data) {
    this.cache.set(key, {
      timestamp: Date.now(),
      data: data
    })
  }

  clearCache() {
    this.cache.clear()
  }
}

export default new WeatherService()