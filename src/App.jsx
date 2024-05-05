
import {useState} from "react";
import Note from "./components/Notes.jsx";


const App = () => {
    const [persons, setPersons] = useState([{name: 'Jagdish Rawat', phoneNo: '008867542884'}]);
    const [newName, setNewName] = useState('');
    const[newPhoneNo, setNewPhoneNo] = useState('');

    const handleNewNameChange = (event)=> {
        console.log("handleNewNameClick", event.target.value);
        setNewName(event.target.value);
    }

    const handlePhoneChange = (event)=> {
        console.log("handlePhoneClick", event.target.value);
        setNewPhoneNo(event.target.value)
    }

    const addPhoneDetails = (event) => {
        event.preventDefault()
        const addedPerson= {name: newName, phoneNo: newPhoneNo}
        console.log("addPhoneDetails: ", {addedPerson})
        const existingPerson = persons.find((person) => JSON.stringify(person) === JSON.stringify(addedPerson))
        if(existingPerson){
            alert(`${newName} is already added to phonebook`)
            return;
        }
        setPersons([...persons, addedPerson]);
        setNewName('')
        setNewPhoneNo('')
    }

    return (
        <div>
            <h2>phonebook</h2>
            <form onSubmit={addPhoneDetails}>
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
                    {persons.map((person, index) => <Note key={index + 1} note={{content: `${person.name} - ${person.phoneNo}`}} />)}
                </ul>
            </div>

        </div>
    )

}

export default App
