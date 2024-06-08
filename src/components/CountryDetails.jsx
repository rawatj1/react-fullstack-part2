import fetchCountries from "../services/fetchCountries.js";
import {useEffect, useState} from "react";
import WeatherDetails from "./WeatherDetails.jsx";

const CountryDetails = ({name}) => {
    const [country, setCountry] = useState(null);
    const hook = () => {
        fetchCountries
            .fetchCountryDetails(name)
            .then(response => {
                const countryDetails = {
                    capital: response.capital[0],
                    area: response.area,
                    languages: Object.values(response.languages),
                    flag: response.flags.png,
                    alt: response.flags.alt,
                }
                console.log(`Country Derails ${JSON.stringify(countryDetails)}`);
                setCountry(countryDetails);
            })
            .catch(error => console.log(error));
    }
    useEffect(hook, [name]);

    if (!country) {
        return (<div>Loading...</div>)
    }

    return (
        <div>
            <h1>{name}</h1>
            <p><em>Capital: {country.capital}</em></p>
            <p><em>Area: {country.area}</em></p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language => (<li key={language}>{language}</li>))}
            </ul>
            <img src={country.flag} alt="flags"/>
            <WeatherDetails country={country}/>
        </div>
    )
}
export default CountryDetails;