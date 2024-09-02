import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const [showConvertedTemp, setShowConvertedTemp] = useState(false);
  const API_KEY = "33da2b246bed5e5268e150e3a3088767";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "location") {
      setLocation(value);
    } else if (name === "country") {
      setCountry(value);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location && country) {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${location},${country}&units=imperial&appid=${API_KEY}`
        );
        const data = await response.json();
        setWeatherData(data);
      }
    };
    fetchWeatherData();
  }, [location, country, API_KEY]);

  const handleConvertClick = () => {
    setShowConvertedTemp(true);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleInputChange}
          placeholder="Enter location"
          className="search-location"
        />
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleInputChange}
          placeholder="Enter country code"
          className="search-country"
        />
        {weatherData && weatherData.main && (
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{weatherData.name}</p>
              </div>
              <div className="temp">
                <h1>{weatherData.main?.temp.toFixed()}°F</h1>
              </div>
              <div className="description">
                <p>{weatherData.weather?.[0]?.main}</p>
              </div>

              {weatherData.name != undefined && (
                <>
                  <button
                    className="conversionBtn"
                    onClick={handleConvertClick}
                  >
                    Convert to Celcius
                  </button>

                  {showConvertedTemp && (
                    <p className="convertedTemp">
                      {" "}
                      {(((weatherData.main.temp - 32) * 5) / 9).toFixed()}°C
                    </p>
                  )}
                </>
              )}
            </div>

            {weatherData.name != undefined && (
              <div className="bottom">
                <div className="feels">
                  {weatherData.main ? (
                    <p className="bold">
                      {weatherData.main?.feels_like.toFixed()}°F
                    </p>
                  ) : null}
                  <p>Feels like</p>
                </div>
                <div className="humidity">
                  {weatherData.main ? (
                    <p className="bold">{weatherData.main?.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {weatherData.wind ? (
                    <p className="bold">
                      {weatherData.wind?.speed.toFixed()}MPH
                    </p>
                  ) : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
