import React, { useState } from "react";
// import "semantic-ui-css/semantic.main.css";
import axios from "axios";
// import { Button } from "semantic-ui-react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
const api = {
  key: `${process.env.REACT_APP_API_KEY}`,
  base: `${process.env.REACT_APP_API_URL}`,
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");

  const WeatherIcon = styled.div`
    color: burlywood;
  `;
  const refresh = () => {
    window.location.reload();
  };

  const getWeather = async (event) => {
    if (event.key === "Enter") {
      try {
        await axios
          .get(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
          .then((result) => {
            setWeather(result.data);
            getIcons(result.data);
            setQuery("");
            console.log(result.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getIcons = (weather) => {
    // console.log(weather);
    if (weather.weather[0].main === "Thunderstorm") {
      setWeatherIcon(<FontAwesomeIcon icon={faBolt} />);
    } else if (weather.weather[0].main === "Drizzle") {
      setWeatherIcon(<FontAwesomeIcon icon={faSnowflake} />);
    } else if (weather.weather[0].main === "Rain") {
      setWeatherIcon(<FontAwesomeIcon icon={faCloudShowersHeavy} />);
    } else if (weather.weather[0].main === "Snow") {
      setWeatherIcon(<FontAwesomeIcon icon={faCloudRain} />);
    } else if (weather.weather[0].main === "Clear") {
      setWeatherIcon(<FontAwesomeIcon icon={faSun} />);
    } else if (weather.weather[0].main === "Clouds") {
      setWeatherIcon(<FontAwesomeIcon icon={faCloud} />);
    } else {
      setWeatherIcon(<FontAwesomeIcon icon={faSmog} />);
    }
  };
  return (
    <main className="App">
      <section>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search your city!"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={getWeather}
          />
        </div>
        <div>
          <button
            class="btn btn-warning btn-lg-circle btn-lg"
            onClick={refresh}
          >
            <i class="fas fa-umbrella"></i>
          </button>
        </div>
      </section>
      {typeof weather.main !== "undefined" ? (
        <div className="location-box">
          <p className="location">
            {" "}
            {weather.name}, {weather.sys.country}
          </p>
          <p>
            {moment().format("dddd")}, <span>{moment().format("LL")}</span>
          </p>
          <p className="weather">
            Temprature: {Math.round(weather.main.temp)} &deg;C
            <p className="temp">Humidity: {weather.main.humidity} %</p>
          </p>
          <div>
            <WeatherIcon style={{ fontSize: 30, marginTop: 15 }}>
              {weatherIcon}
            </WeatherIcon>
            <p className="description">{weather.weather[0].main}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}

export default Weather;
