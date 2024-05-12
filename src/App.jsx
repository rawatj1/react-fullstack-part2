
import {useEffect, useState} from "react";
import axios from "axios";
import Note from "./components/Notes.jsx";


const App = () => {
    const[persons, setPersons] = useState([]);
    const[newName, setNewName] = useState('');
    const[newPhoneNo, setNewPhoneNo] = useState('');
    const[filteredPersons, setFilteredPersons] = useState(persons);

    const hook = () => {
        console.log('effect');
        axios
            .get('http://localhost:3001/persons')
            .then((response) => {
                console.log('promise fulfilled')
                setPersons(response.data)
                setFilteredPersons(response.data)
            })
    }
    useEffect(hook, []);

    const handleNewNameChange = (event)=> {
        console.log("handleNewNameClick", event.target.value);
        setNewName(event.target.value);
    }

    const handlePhoneChange = (event)=> {
        console.log("handlePhoneClick", event.target.value);
        setNewPhoneNo(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log("handleFilterChange", event.target.value);
        const filterValue = event.target.value;
        if (filterValue === '') {
            setFilteredPersons(persons)
        }else {
            const filterPersons = persons.filter((person) => person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
            setFilteredPersons(filterPersons)
        }
    }

    const addPhoneDetails = (event) => {
        event.preventDefault()
        const addedPerson= {name: newName, number: newPhoneNo, id: persons.length + 1}
        console.log("addPhoneDetails: ", {addedPerson})
        const existingPerson = persons.find((person) => JSON.stringify(person) === JSON.stringify(addedPerson))
        if(existingPerson){
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
                Filter Shown with:  <input onChange={handleFilterChange}/>
            </div>
            <form onSubmit={addPhoneDetails}>
                <h2>add a new</h2>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange}/>
                </div>
                <div>
                    number: <input value={newPhoneNo} onChange={handlePhoneChange}/>
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div className="persons">
                <ul>
                    {filteredPersons.map((person, index) => <Note key={person.id} note={{content: `${person.name} - ${person.number}`}} />)}
                </ul>
            </div>

        </div>
    )

}

export default App
