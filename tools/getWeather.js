/**
 * Get current weather for a given city using wttr.in (public service, no API key required)
 * @param {string} city - The name of the city
 * @returns {Promise<Object>} Weather data object
 */
async function getWeather(city) {
  if (!city || typeof city !== 'string') {
    throw new Error('City name is required and must be a string.');
  }

  const API_URL = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Weather service error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.current_condition || !data.current_condition[0]) {
      throw new Error(`City "${city}" not found or weather data unavailable.`);
    }

    if (!data.nearest_area || !data.nearest_area[0]) {
      throw new Error(`Location data for "${city}" not available.`);
    }

    const current = data.current_condition[0];
    const location = data.nearest_area[0];
    
    // Validate required fields
    if (!current.temp_C || !location.areaName || !location.areaName[0]) {
      throw new Error(`Incomplete weather data for "${city}".`);
    }
    
    return {
      city: location.areaName[0].value || city,
      country: location.country && location.country[0] ? location.country[0].value : 'Unknown',
      temperature: parseInt(current.temp_C, 10) || 0,
      feelsLike: parseInt(current.FeelsLikeC, 10) || 0,
      description: current.weatherDesc && current.weatherDesc[0] ? current.weatherDesc[0].value.trim() : 'N/A',
      humidity: parseInt(current.humidity, 10) || 0,
      windSpeed: parseFloat(current.windspeedKmph) || 0,
      visibility: parseFloat(current.visibility) || 0,
      pressure: parseInt(current.pressure, 10) || 0,
      uvIndex: parseInt(current.uvIndex, 10) || 0
    };
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Network error: Could not connect to weather service.');
    }
    throw error;
  }
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getWeather };
}

// Allow direct execution from command line
if (require.main === module) {
  const city = process.argv[2];

  if (!city) {
    console.error('Usage: node getWeather.js <city>');
    process.exit(1);
  }

  getWeather(city)
    .then(weather => {
      console.log(JSON.stringify(weather, null, 2));
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}

