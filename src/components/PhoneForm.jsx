import {useState} from "react";
import phoneService from "../services/phone.js";

const PhoneForm = ({persons, setPersons, setInfoMessage, setErrorMessage}) => {
    const[newName, setNewName] = useState('');
    const[newPhoneNo, setNewPhoneNo] = useState('');

    const handleNewNameChange = (event)=> {
        console.log("handleNewNameClick", event.target.value);
        setNewName(event.target.value);
    }

    const handlePhoneChange = (event)=> {
        console.log("handlePhoneClick", event.target.value);
        setNewPhoneNo(event.target.value)
    }

    const clearInfoMessage = () =>{
        setInfoMessage('')
    }

    const clearErrorMessage = () =>{
        setErrorMessage('')
    }

    const addPhoneDetails = (event) => {
        event.preventDefault()
        const addedPerson = {name: newName, number: newPhoneNo}
        const existingPerson = persons.find(p => p.name.toLocaleLowerCase().trim() === newName.toLocaleLowerCase().trim())
        console.log(`existingPerson: ${existingPerson}`)
        if (existingPerson) {
            if (window.confirm(`${existingPerson.name} is already present in the phonebook, replace the old number`)) {
                phoneService
                    .update(existingPerson.id, {name: existingPerson.name, number: newPhoneNo})
                    .then(resData => {
                        console.log("Updated user Number");
                        setInfoMessage(`${resData.name} updated!`);
                        setTimeout(() => clearInfoMessage(), 2000)
                        phoneService.getAll().then((updatedPersons) => setPersons(updatedPersons))
                    })
                    .catch(err => {
                        console.log(err)
                        setTimeout(() => clearErrorMessage(), 2000)
                        setErrorMessage(`${addedPerson.name} cannot update the details`)
                    });
            }
        } else {
            phoneService
                .create(addedPerson)
                .then(resData => {
                    phoneService.getAll().then((updatedPersons) => setPersons(updatedPersons))
                    setNewName('')
                    setNewPhoneNo('')
                    setInfoMessage(`Added ${resData.name}`)
                    setTimeout(() => clearInfoMessage(), 2000)
                })
        }
    }

    return (
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
    )
}

export default PhoneForm