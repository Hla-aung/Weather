import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import ForecastWeather from "./components/forecast-weather/ForecastWeather";
import { WeatherApiUrl, WeatherApiKey } from "./components/api/Api";
import "./App.css";
import { useState } from "react";

function App() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WeatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`
    );
    const forecastWeatherFetch = fetch(
      `${WeatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const currentResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrent({ city: searchData.label, ...currentResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };

  console.log(current);
  console.log(forecast);

  const bgImg =
    current === null
      ? "/background/Clear.jpg"
      : `/background/${current.weather[0].main}.jpg`;

  const style = {
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="container App" style={style}>
      <Search onSearchChange={handleSearchChange} />
      {current && <CurrentWeather data={current} />}
      {forecast && <ForecastWeather data={forecast} />}
    </div>
  );
}

export default App;
