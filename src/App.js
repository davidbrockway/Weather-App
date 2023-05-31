import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import WeatherAPI from "./WeatherAPI";

function App() {
  const [city, setCity] = useState("");

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
  <FontAwesomeIcon icon={faCloud} size="4x" className="mb-4" />
  <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <h1 className="text-3xl font-bold mb-4">Weather Application</h1>
    <input
      type="text"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      placeholder="Enter city name"
      className="w-full p-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
    />
    <WeatherAPI city={city} />
  </div>
</div>

  );
}

export default App;
