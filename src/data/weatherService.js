import mockWeather from "./mockWeather.json";

function getWeatherEmoji(weatherCode, isDay) {
  // WMO Weather interpretation codes (Open-Meteo)
  if (weatherCode === 0) return isDay ? '☀️' : '🌙'; // Clear
  if (weatherCode === 1 || weatherCode === 2) return isDay ? '⛅' : '☁️'; // Partly cloudy
  if (weatherCode === 3) return '☁️'; // Overcast
  if (weatherCode >= 45 && weatherCode <= 48) return '🌫️'; // Fog
  if (weatherCode >= 51 && weatherCode <= 67) return '🌧️'; // Drizzle / Rain
  if (weatherCode >= 71 && weatherCode <= 77) return '❄️'; // Snow
  if (weatherCode >= 80 && weatherCode <= 82) return '🌦️'; // Rain showers
  if (weatherCode >= 95 && weatherCode <= 99) return '⛈️'; // Thunderstorm
  return '🌤️';
}

function getWeatherConditionText(weatherCode) {
  if (weatherCode === 0) return 'Clear';
  if (weatherCode === 1 || weatherCode === 2) return 'Partly cloudy';
  if (weatherCode === 3) return 'Overcast';
  if (weatherCode >= 45 && weatherCode <= 48) return 'Foggy';
  if (weatherCode >= 51 && weatherCode <= 67) return 'Rain';
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snow';
  if (weatherCode >= 80 && weatherCode <= 82) return 'Showers';
  if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm';
  return 'Clear';
}

export async function fetchLiveWeather(lat = 18.5204, lon = 73.8567) {
  try {
    // Open-Meteo is completely free, requires no API key, and activates instantly.
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,is_day&hourly=precipitation_probability`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch failed");
    
    const data = await res.json();
    const current = data.current;
    
    // Fallback probability if current doesn't have it, we take the next hour's probability
    const rainProb = current.precipitation_probability || (data.hourly && data.hourly.precipitation_probability[0]) || 0;

    return {
      id: "live",
      condition: getWeatherConditionText(current.weather_code),
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: Math.round(current.relative_humidity_2m),
      rainProbability: rainProb,
      wind: Math.round(current.wind_speed_10m),
      icon: getWeatherEmoji(current.weather_code, current.is_day === 1),
      tip: "Live local weather active."
    };
  } catch (err) {
    console.error("Live weather error:", err);
    return mockWeather.scenarios[1]; // fallback to warm-dry mock
  }
}
