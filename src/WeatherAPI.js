import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faTemperatureLow,
  faTint,
  faWind,
  faCompass,
  faCompressArrowsAlt,
  faEye,
  faCloud,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";

function WeatherAPI({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "2fce26b3009e0a66de8c0a0223800869"; // API Key - Public Use

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (response.data.cod === "404") {
        setError("City / Town not found");
        setWeather(null);
      } else {
        setWeather(response.data);
        setError(null);
      }
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
      setWeather(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
        return faTemperatureHigh;
      case "01n":
        return faTemperatureLow;
      case "02d":
      case "02n":
        return faCloud;
      case "03d":
      case "03n":
        return faCloud;
      case "04d":
      case "04n":
        return faCloud;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return faCloudShowersHeavy;
      case "11d":
      case "11n":
        return faCompressArrowsAlt;
      case "13d":
      case "13n":
        return faCompressArrowsAlt;
      case "50d":
      case "50n":
        return faEye;
      default:
        return null;
    }
  };

  return (
    <div className="text-center">
      {weather ? (
        <div>
          <h2 className="text-lg font-bold mb-4">Weather Details</h2>
          <p className="mb-2">
            <FontAwesomeIcon
              icon={faTemperatureHigh}
              className="mr-2 text-2xl inline-block"
            />
            Temperature: {weather.main.temp}°C
          </p>
          <p className="mb-2">
            <FontAwesomeIcon
              icon={faTint}
              className="mr-2 text-2xl inline-block"
            />
            Humidity: {weather.main.humidity}%
          </p>
          <p className="mb-2">
            <FontAwesomeIcon
              icon={faWind}
              className="mr-2 text-2xl inline-block"
            />
            Wind Speed: {weather.wind.speed}m/s
          </p>
          <p className="mb-2">
            <FontAwesomeIcon
              icon={faCompass}
              className="mr-2 text-2xl inline-block"
            />
            Wind Direction: {weather.wind.deg}°
          </p>
          <p className="mb-2">
            <FontAwesomeIcon
              icon={faCompressArrowsAlt}
              className="mr-2 text-2xl inline-block"
            />
            Pressure: {weather.main.pressure}hPa
          </p>
          <p className="mb-2">
            <FontAwesomeIcon
              icon={faEye}
              className="mr-2 text-2xl inline-block"
            />
            Visibility: {weather.visibility / 1000}km
          </p>
        </div>
      ) : (
        <p>{error || "Enter Valid City Name"}</p>
      )}
    </div>
  );
}

export default WeatherAPI;
