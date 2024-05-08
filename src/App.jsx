import {useState} from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";


const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [newName, setNewName] = useState('');
    const [newPhoneNo, setNewPhoneNo] = useState('');
    const [filteredPersons, setFilteredPersons] = useState(persons);

    const handleNewNameChange = (event) => {
        console.log("handleNewNameClick", event.target.value);
        setNewName(event.target.value);
    }

    const handlePhoneChange = (event) => {
        console.log("handlePhoneClick", event.target.value);
        setNewPhoneNo(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log("handleFilterChange", event.target.value);
        const filterValue = event.target.value;
        if (filterValue === '') {
            setFilteredPersons(persons)
        } else {
            const filterPersons = persons.filter((person) => person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
            setFilteredPersons(filterPersons)
        }
    }

    const addPhoneDetails = (event) => {
        event.preventDefault()
        const addedPerson = {name: newName, number: newPhoneNo, id: persons.length + 1}
        console.log("addPhoneDetails: ", {addedPerson})
        const existingPerson = persons.find((person) => JSON.stringify(person) === JSON.stringify(addedPerson))
        if (existingPerson) {
            alert(`${newName} is already added to phonebook`)
            return;
        }
        const newPersons = [...persons, addedPerson]
        setPersons(newPersons);
        setFilteredPersons(newPersons);
        setNewName('')
        setNewPhoneNo('')
    }

    return (
        <div>
            <h2>phonebook</h2>
            <div>
                {<Filter handleFilterChange={handleFilterChange}/>}
            </div>
            <PersonForm newName={newName}
                        newPhoneNo={newPhoneNo}
                        handleNewNameChange={handleNewNameChange}
                        handlePhoneChange={handlePhoneChange}
                        addPhoneDetails={addPhoneDetails} />
            <h2>Numbers</h2>

            <Persons persons={filteredPersons}/>
        </div>
    )

}

export default App
