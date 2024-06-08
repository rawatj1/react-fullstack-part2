import {useEffect, useState} from "react";
import country from "./services/fetchCountries.js"
import SearchBar from "./components/SearchBar.jsx";
import CountryList from "./components/CountryList.jsx";
import CountryDetails from "./components/CountryDetails.jsx";


const App = () => {
    const [allCountries, setAllCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const hook = () => {
        country
            .getAll()
            .then(res => {
                const countryNames = res.map(country => country.name.common)
                setAllCountries(countryNames)
            })
            .catch(error => console.log(error));
    }
    useEffect(hook, []);

        const handleFilterCountries = (searchValue) => {
        console.log(`Searching for country ${searchValue}`);
        const filteredCountries = allCountries.filter(name => {
            return name.trim().toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredCountries(filteredCountries)
    }

    return (
        <div>
            <SearchBar onSearch={handleFilterCountries}/>
            {
                filteredCountries.length === 1 ? (
                    <CountryDetails name={filteredCountries[0]}/>
                ) : filteredCountries.length <= 10 ? (
                    <CountryList filteredCountries={filteredCountries} />
                ) : (<p>Please make your query more specific.</p>)
            }

        </div>
    )

}

export default App
