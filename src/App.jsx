
import {useEffect, useState} from "react";
import Phone from "./components/Phones.jsx";
import phoneService from "./services/phone.js";


const App = () => {
    const[persons, setPersons] = useState([]);
    const[newName, setNewName] = useState('');
    const[newPhoneNo, setNewPhoneNo] = useState('');

    const hook = () => {
        console.log('effect');
        phoneService
            .getAll()
            .then(initialPhoneData => {
                console.log('promise fulfilled')
                setPersons(initialPhoneData)
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
        const filterPersons = persons.filter((person) => person.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
        setPersons(filterPersons)
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
        phoneService
            .create(addedPerson)
            .then(_ => {
                setPersons(persons.concat(addedPerson))
                setNewName('')
                setNewPhoneNo('')
            })
    }

    const handlePhoneDelete = (id, name) =>{
        if(window.confirm(`delete ${name} ?`)){
            phoneService
                .deleteData(id)
                .then(_ => {
                    setPersons(persons.filter((person) => person.id !== id))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
                    {persons.map((person, index) =>
                        <Phone key={person.id} phone={{content: `${person.name} - ${person.number}`}} handlePhoneDelete = {() => handlePhoneDelete(person.id, person.name)} />)}
                </ul>
            </div>
        </div>
    )

}

export default App
