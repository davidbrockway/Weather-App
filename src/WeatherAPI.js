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
  faMapMarkerAlt,
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
      if (response.data.message === "city not found") {
        setError("City / Town not found");
        setWeather(null);
      } else {
        setWeather(response.data);
        setError(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found, enter valid city name");
      } else {
        setError("Error fetching weather data. Please try again.");
      }
      setWeather(null);
    }
  };

  useEffect(() => {
    let timeoutId = null;
    if (city) {
      timeoutId = setTimeout(fetchWeather, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
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
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl mb-1" />
            <p>
              Location: {weather.name}, {weather.sys.country}
            </p>
          </div>
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon
              icon={getWeatherIcon(weather.weather[0].icon)}
              className="text-2xl mb-1"
            />
            <p>Temperature: {weather.main.temp}°C</p>
          </div>
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon icon={faTint} className="text-2xl mb-1" />
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon icon={faWind} className="text-2xl mb-1" />
            <p>Wind Speed: {weather.wind.speed}m/s</p>
          </div>
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon icon={faCompass} className="text-2xl mb-1" />
            <p>Wind Direction: {weather.wind.deg}°</p>
          </div>
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon
              icon={faCompressArrowsAlt}
              className="text-2xl mb-1"
            />
            <p>Pressure: {weather.main.pressure}hPa</p>
          </div>
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon icon={faEye} className="text-2xl mb-1" />
            <p>Visibility: {weather.visibility / 1000}km</p>
          </div>
        </div>
      ) : (
        <p>{error || "Enter Valid City Name"}</p>
      )}
    </div>
  );
}

export default WeatherAPI;
