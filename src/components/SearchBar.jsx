const SearchBar = ({onSearch}) => {
    const handleInputChange = (event) => {
        onSearch(event.target.value);
    }
     return (
        <div>
            <h1> Find countries: </h1> <input onChange={handleInputChange}></input>
        </div>
    )
}

export default SearchBar;