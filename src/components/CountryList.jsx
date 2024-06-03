const CountryList = ({filteredCountries, setFilteredCountries}) => {
    return (
        <div>
            <ul>
                {filteredCountries.map(country => (
                    <li key={country.trim()}>{country} <button onClick={() => setFilteredCountries([country])}>show</button></li>
                ))}
            </ul>
        </div>)
}

export default CountryList;