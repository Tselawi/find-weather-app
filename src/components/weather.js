import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import Moment from "react-moment";

const api = {
  key: `${process.env.REACT_APP_API_KEY}`,
  base: `${process.env.REACT_APP_API_URL}`,
  clientId: "3PIY2U5XdbpRKrD8Y8I9oyAJbOlAEyG7pj1zEZrVW48",
  // clientId: `${process.env.REACT_APP_UNSPLASH_API_KEY}`,
  clientUrl: "https://api.unsplash.com/search/photos?page=1",
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherList, setWeatherList] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const [client, setClient] = useState({});

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
            // console.log(result.data);
          });
        await axios
          .get(
            `${api.base}/forecast/daily?q=${query}&cnt=6&units=metric&appid=${api.key}`
          )
          .then((result) => {
            setWeatherList(result.data);
            setQuery("");
            // console.log(result.data);
          });
        await axios
          .get(`${api.clientUrl}&query=${query}&client_id=${api.clientId}`)
          .then((result) => {
            setClient(result.data);
            setQuery("");
            // console.log(result.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getIcons = (weather) => {
    if (weather.weather[0].main === "Thunderstorm") {
      setWeatherIcon(
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      );
    } else if (weather.weather[0].main === "Drizzle") {
      setWeatherIcon(
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      );
    } else if (weather.weather[0].main === "Rain") {
      setWeatherIcon(
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      );
    } else if (weather.weather[0].main === "Snow") {
      setWeatherIcon(
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      );
    } else if (weather.weather[0].main === "Clear") {
      setWeatherIcon(
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      );
    } else if (
      (
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      )
    ) {
      setWeatherIcon(
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      );
    } else {
      setWeatherIcon(
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="img"
        />
      );
    }
  };

  return (
    <main className="app">
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
        <div className="btn-center">
          <button
            className="btn btn-warning btn-lg-circle btn-lg"
            onClick={refresh}
          >
            <i className="fas fa-sync"></i>
          </button>
        </div>
      </section>
      <section className="container-fluid my-5">
        <div class="row">
          {typeof weather.main !== "undefined" ? (
            <div className=" col-lg-5 col-md-5 col-sm-5">
              <div className="location">
                {" "}
                <i className="fas fa-home mx-3"></i>
                {weather.name}, {weather.sys.country}
                <p>
                  <i class="fas fa-calendar-day mx-3"></i>
                  {moment().format("ddd")}, <span>{moment().format("LL")}</span>
                </p>
                <i class="fas fa-temperature-high mx-3 my-2"></i>{" "}
                {Math.round(weather.main.temp)} &deg;C
                <p>
                  <i class="fas fa-percentage mx-3"></i> {weather.main.humidity}{" "}
                  %
                </p>
                <p className="icon-weather mx-4">{weatherIcon}</p>
                <p className="description mx-4 text-uppercase">
                  {weather.weather[0].main}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <section className="col-7">
            {typeof client.results !== "undefined" ? (
              <img
                className="img-background"
                src={client.results[0].urls.small}
                alt="img"
              />
            ) : (
              ""
            )}
          </section>
        </div>
      </section>

      <section>
        {typeof weatherList.list !== "undefined" ? (
          <table className="table text-center">
            <thead className="thead-dark location">
              <tr>
                <th scope="col">
                  <Moment unix format="ddd">
                    {weatherList.list[1].dt}
                  </Moment>
                </th>
                <th scope="col">
                  <Moment unix format="ddd">
                    {weatherList.list[2].dt}
                  </Moment>
                </th>
                <th scope="col">
                  <Moment unix format="ddd">
                    {weatherList.list[3].dt}
                  </Moment>
                </th>
                <th scope="col">
                  <Moment unix format="ddd">
                    {weatherList.list[4].dt}
                  </Moment>
                </th>
                <th scope="col">
                  <Moment unix format="ddd">
                    {weatherList.list[5].dt}
                  </Moment>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherList.list[1].weather[0].icon}.png`}
                    alt="img"
                  />
                </th>
                <td>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherList.list[2].weather[0].icon}.png`}
                    alt="img"
                  />
                </td>
                <td>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherList.list[3].weather[0].icon}.png`}
                    alt="img"
                  />
                </td>
                <td>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherList.list[4].weather[0].icon}.png`}
                    alt="img"
                  />
                </td>
                <td>
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherList.list[5].weather[0].icon}.png`}
                    alt="img"
                  />
                </td>
              </tr>
              <tr className="location">
                <th>{Math.round(weatherList.list[1].temp.day)} &deg;C</th>
                <th>{Math.round(weatherList.list[2].temp.day)} &deg;C</th>
                <th>{Math.round(weatherList.list[3].temp.day)} &deg;C</th>
                <th>{Math.round(weatherList.list[4].temp.day)} &deg;C</th>
                <th>{Math.round(weatherList.list[5].temp.day)} &deg;C</th>
              </tr>
            </tbody>
          </table>
        ) : (
          ""
        )}
      </section>
    </main>
  );
}

export default Weather;
