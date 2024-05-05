
import {useState} from "react";
import Note from "./components/Notes.jsx";


const App = () => {
    const [persons, setPersons] = useState([{name: 'Jagdish Chandra singh rawat'}]);
    const [newName, setNewName] = useState('');

    const handleNewNameChange = (event)=> {
        console.log("handleNewNameClick", event.target.value);
        setNewName(event.target.value);
    }

    const addPhoneDetails = (event) => {
        console.log("addPhoneDetails: ", {name: newName})
        event.preventDefault()
        const existingPerson = persons.find((person) => person.name === newName)
        if(existingPerson){
            alert(`${newName} is already added to phonebook`)
            return;
        }
        setPersons([...persons, { name: newName }]);
        setNewName('')
    }

    return (
        <div>
            <h2>phonebook</h2>
            <form onSubmit={addPhoneDetails}>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div className="persons">
                <ul>
                    {persons.map((person, index) => <Note key={index + 1} note={{content: person.name}} />)}
                </ul>
            </div>

        </div>
    )

}

export default App
