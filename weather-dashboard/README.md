# Weather Dashboard

**Day 6 Project | Vue 7-Day Mastery Program**

A real-time weather dashboard application built with Vue 3 and WeatherAPI.com, featuring city search with autocomplete, favorite cities management with weather caching, and unit conversion.

## Features

- **City Search with Autocomplete**: Real-time city search with dropdown results (minimum 3 characters)
- **Weather Data Display**: Show current temperature, condition, humidity, and wind speed
- **Favorite Cities Management**: Add, remove, and view favorite cities in a table format
- **Weather Data Caching**: Automatic caching of weather data for favorite cities
- **Unit Conversion**: Toggle between metric (°C, km/h) and imperial (°F, mph) units
- **Local Storage Persistence**: Favorite cities are saved between browser sessions
- **Responsive Design**: Adapts to different screen sizes

## Tech Stack

- **Vue 3** (Composition API)
- **Pinia** (State Management)
- **Axios** (HTTP Client)
- **WeatherAPI.com** (Weather Data)
- **CSS3** (Custom Styling)
- **Vite** (Build Tool)

## Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.vue    # Main weather display with search
│   │   └── FavoriteCities.vue    # Favorites table with weather data
│   ├── services/
│   │   ├── api.js                # Axios instance with interceptors
│   │   └── weatherService.js     # WeatherAPI integration with caching
│   ├── stores/
│   │   └── weather.js            # Pinia store for global state
│   ├── styles/
│   │   └── style.css             # Global styles with CSS variables
│   ├── App.vue                   # Root component
│   └── main.js                   # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Architecture

The application follows a unidirectional data flow:

```
┌─────────────────┐
│   App.vue       │
│  (Root Layout)  │
└────────┬────────┘
         │
    ┌────┴─────┐      ┌─────────────────┐
    │          │      │                 │
┌───▼──────┐   │  ┌───▼─────────┐       │
│Current   │   │  │Favorite     │       │
│Weather   │   │  │Cities       │       │
└───┬──────┘   │  └───┬─────────┘       │
    │          │      │                 │
    └────┬─────┘      └────────┬────────┘
         │                     │
    ┌────▼─────────────────────▼────┐
    │     Pinia Store (weather.js)  │
    │  - weatherData                │
    │  - favorites[]                │
    │  - favoriteWeatherCache       │
    │  - unit preference            │
    └──────────────┬────────────────┘
                   │
            ┌──────▼──────┐
            │ Weather     │
            │ Service     │
            │ (Caching)   │
            └──────┬──────┘
                   │
            ┌──────▼──────┐
            │ WeatherAPI  │
            │ .com        │
            └─────────────┘
```

## Getting Started

### Prerequisites

- Node.js 16 or higher
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Installation

1. Navigate to the weather-dashboard directory:
```bash
cd vue-7-day-mastery/weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the project root:
```env
VITE_WEATHERAPI_KEY=your_api_key_here
VITE_WEATHERAPI_BASE_URL=https://api.weatherapi.com/v1
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Key Implementation Details

### 1. Search with Debouncing
The search functionality implements 300ms debouncing to prevent excessive API calls:
```javascript
watch(cityInput, (newValue) => {
  clearTimeout(searchTimeout.value)
  
  if (newValue.trim().length >= 3) {
    searchTimeout.value = setTimeout(async () => {
      await weatherStore.searchCities(newValue.trim())
      showDropdown.value = true
    }, 300)
  }
})
```

### 2. Weather Data Caching for Favorites
The application caches weather data for favorite cities to reduce API calls:
```javascript
// In weather store
const favoriteWeatherCache = ref({})

const updateFavoriteWeatherCache = async (cities) => {
  for (const city of cities) {
    const result = await weatherService.getCurrentWeather(city.split(',')[0].trim())
    if (result.success) {
      favoriteWeatherCache.value[city] = result.data
    }
  }
}
```

### 3. Local Storage Integration
Favorite cities are automatically persisted using Vue watchers:
```javascript
watch(favorites, (newFavorites) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('weather-favorites', JSON.stringify(newFavorites))
  }
}, { deep: true })
```

### 4. Error Handling
Comprehensive error handling for various scenarios:
- API key validation errors
- Network connectivity issues
- Invalid city names
- Browser storage limitations

## API Integration

The application uses WeatherAPI.com with the following endpoints:

1. **Current Weather**: `/forecast.json` (with `days=1` parameter)
2. **City Search**: `/search.json` (for autocomplete functionality)

The service layer includes:
- Request/response interceptors for error handling
- 10-minute caching for weather data
- Response transformation to application-specific format

## State Management with Pinia

The central store (`stores/weather.js`) manages:
- Current weather data and loading states
- Favorite cities list with localStorage persistence
- Weather data cache for favorite cities
- Unit preference (metric/imperial)
- Search results and search state

## Learning Focus

This project demonstrates:

1. **External API Integration**: Connecting Vue applications to third-party services
2. **Advanced State Management**: Using Pinia with complex state relationships
3. **Performance Optimization**: Implementing caching and debouncing strategies
4. **User Experience**: Building intuitive interfaces with immediate feedback
5. **Data Persistence**: Maintaining state across browser sessions

## Deployment

Build the project for production:
```bash
npm run build
```

The build artifacts will be in the `dist/` directory, ready for deployment to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Future Enhancements

Potential improvements based on the current implementation:
1. Add 3-day forecast display
2. Implement geolocation for current position
3. Add weather alerts and notifications
4. Include weather maps and charts
5. Implement PWA capabilities for offline access

---

*This project represents Day 6 of the Vue 7-Day Mastery program, focusing on real-world API integration and complex state management patterns.*
```