// src/services/weatherService.js
import api from "./api";

class WeatherService {
  async getCurrentWeather(city) {
    try {
      console.log('Fetching weather for:', city) // DEBUG

      const response = await api.get('/forecast.json', {
        params: {
          q: city,
          days: 1
        }
      })

      console.log('API Response:', response.data) // DEBUG

      const transformedData = {
        location: `${response.data.location.name}, ${response.data.location.country}`,
        temperature: Math.round(response.data.current.temp_c),
        condition: response.data.current.condition.text,
        icon: response.data.current.condition.icon,
        humidity: response.data.current.humidity,
        windSpeed: Math.round(response.data.current.wind_kph)
      }

      return { success: true, data: transformedData }

    } catch (error) {
      console.error('Weather API Error:', error) // DEBUG

      let message = "Gagal mengambil data cuaca"

      if (error.response) {
        // Server responded with error
        switch (error.response.status) {
          case 400:
            message = "Kota tidak ditemukan. Coba kota lain."
            break
          case 401:
            message = "API Key tidak valid. Periksa .env file."
            break
          case 403:
            message = "Akses API ditolak. Mungkin quota habis."
            break
          case 404:
            message = "Endpoint tidak ditemukan."
            break
        }
      } else if (error.request) {
        // Request dibuat tapi tidak ada response
        message = "Tidak dapat terhubung ke server. Cek koneksi internet."
      }

      return {
        success: false,
        error: {
          message,
          status: error.response?.status,
          originalError: error.message
        }
      }
    }
  }

  async searchCities(query) {
  try {
    // WeatherAPI punya endpoint /search.json untuk autocomplete
    const response = await api.get('/search.json', {
      params: {
        q: query
      }
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
        message: "Failed to search cities",
        originalError: error
      }
    }
  }
}
}
export default new WeatherService();