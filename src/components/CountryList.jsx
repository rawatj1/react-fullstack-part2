import {useState} from "react";
import CountryDetails from "./CountryDetails.jsx";

const CountryList = ({filteredCountries}) => {
    const [countryName, setCountryName] = useState('');
    return (
        <div>
            <ul>
                {filteredCountries.map(country => (
                    <li key={country.trim()}>{country} <button onClick={() => setCountryName(country)}>show</button></li>
                ))}

            </ul>
            {countryName && <CountryDetails name={countryName} />}
        </div>)
}

export default CountryList;