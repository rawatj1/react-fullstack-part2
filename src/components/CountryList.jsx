const CountryList = ({filteredCountries}) => {
    return (
        <div>
            <ul>
                {filteredCountries.map(country => (
                    <li key={country.trim()}>{country}</li>
                ))}
            </ul>
        </div>)
}

export default CountryList;