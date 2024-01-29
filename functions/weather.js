import axios from "axios";
import { config } from "../config.js";

export const getWeather = async (ctx) => {
  // console.log(ctx.message.location);
  let locationLatitude = ctx.message.location.latitude;
  let locationLongitude = ctx.message.location.longitude;

  const { KEY_OPEN_WEATHER_MAP } = process.env;

  const urlWeather = `${config.urlOpenWeatherMap}?lat=${locationLatitude}&lon=${locationLongitude}&units=metric&appid=${KEY_OPEN_WEATHER_MAP}`;

  const response = await axios.get(urlWeather);
  // console.log(response);
  // console.log(response.data.weather);

  let country = response.data.sys.country;
  let name = response.data.name;
  let temp = response.data.main.temp;
  let tempFeelsLike = response.data.main.feels_like;
  let humidity = response.data.main.humidity;

  let sunriseDate = new Date(response.data.sys.sunrise * 1000);
  let sunsetDate = new Date(response.data.sys.sunset * 1000);
  let sunriseHours = sunriseDate.getHours();
  let sunriseMinutes = sunriseDate.getMinutes();
  let sunsetHours = sunsetDate.getHours();
  let sunsetMinutes = sunsetDate.getMinutes();

  let weather = response.data.weather[0].main;
  let icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  let text = `
${country}, ${name}.
Temperature: ${temp}°C.
Feeling temperature: ${tempFeelsLike}°C.
Humidity: ${humidity}%.
Sunrise: ${sunriseHours}:${sunriseMinutes}. Sunset: ${sunsetHours}:${sunsetMinutes}.
${weather}, ${icon}
  `;

  console.log(
    `${country}; ${name}; latitude=${locationLatitude}; longitude=${locationLongitude}.`
  );

  return text;
};
