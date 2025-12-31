import { ref } from 'vue'

export function useGeolocation() {
  const coords = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        error.value = 'Geolocation not supported by your browser'
        reject(new Error('Geolocation not supported'))
        return
      }

      isLoading.value = true

      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
          error.value = null
          isLoading.value = false
          resolve(coords.value)
        },
        (err) => {
          error.value = getGeolocationError(err)
          isLoading.value = false
          reject(err)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    })
  }

  const getGeolocationError = (error) => {
    switch (error.code) {
      case 1:
        return 'Location permission denied. Please enable location services.'
      case 2:
        return 'Location unavailable. Please check your connection.'
      case 3:
        return 'Location request timeout. Please try again.'
      default:
        return `Location error: ${error.message}`
    }
  }

  const clearLocation = () => {
    coords.value = null
    error.value = null
  }

  return {
    coords,
    error,
    isLoading,
    getCurrentLocation,
    clearLocation
  }
}