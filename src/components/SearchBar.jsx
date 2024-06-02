const SearchBar = ({searchInput, allCountries, setSearchInput, setFilteredCountries}) => {
    const handleFilterCountries = (event) => {
        console.log(`Searching for country ${event.target.value}`);
        setSearchInput(event.target.value);
        const filteredCountries = allCountries.filter(name => {
            return name.trim().toLowerCase().includes(event.target.value.toLowerCase());
        });
        setFilteredCountries(filteredCountries)
    }

    return (
        <div>
            <h1> Find countries: </h1> <input onChange={handleFilterCountries}></input>
        </div>
    )
}
export default SearchBar;