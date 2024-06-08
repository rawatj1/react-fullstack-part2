import axios from 'axios';

const baseURL = 'https://api.openweathermap.org/'
const openWeatherAPI_KEY = import.meta.env.APP_OPEN_WEATHER

const getGeoLocation = (capital) => {
    const request = axios.get(`${baseURL}/geo/1.0/direct?q=${capital}&appid=${openWeatherAPI_KEY}`);
    return request.then(response => response.data)
}

const getWeatherData = (lat, lon) => {
    const request = axios.get(`${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={minutely,hourly,daily,alerts}&units=metric&appid=${openWeatherAPI_KEY}`);
    return request.then(response => response.data)
}

export default {
    getGeoLocation: getGeoLocation,
    getWeatherData: getWeatherData
}