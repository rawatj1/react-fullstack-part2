import fetchWeather from "../services/fetchweather.js";
import {useEffect, useState} from "react";

const WeatherDetails = ({country}) => {
    const [weather, setWeather] = useState(null);

    const hook = () => {
        fetchWeather
            .getGeoLocation(country.capital)
            .then(response => {
                const data = response.find(item => item.name === country.capital)
                fetchWeather
                    .getWeatherData(data.lat, data.lon)
                    .then(res => {
                        const weatherData= {
                            temp: res.main.temp,
                            wind: res.wind.speed,
                            icon: res.weather[0].icon
                        }
                        setWeather(weatherData)
                        console.log(JSON.stringify(res))
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
    }
    useEffect(hook, [country]);

    if (!weather) {
        return (<div>Loading...</div>)
    }
    return (
        <div>
            <h1>Weather in {country.capital}</h1>
            <p>Temperature {weather.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather icon"/>
            <p>wind {weather.wind} m/s</p>

        </div>
    )
}

export default WeatherDetails