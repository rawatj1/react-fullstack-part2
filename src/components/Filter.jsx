
const Filter = ({persons, setPersons}) => {
    const handleFilterChange = (event) => {
        console.log("handleFilterChange", event.target.value);
        const filterValue = event.target.value;
        const filterPersons = persons.filter((person) => person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
        setPersons(filterPersons)
    }

    return (
        <div>
            Filter Shown with: <input onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter