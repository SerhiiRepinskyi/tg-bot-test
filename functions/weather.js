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
  let temperature = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let weather = response.data.weather[0].main;
  let icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  let text = `${country}, ${name}. Temperature: ${temperature}°C. Humidity: ${humidity}%. ${weather}, ${icon}`;

  return text;
};
