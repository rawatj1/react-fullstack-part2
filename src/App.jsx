import {useEffect, useState} from "react";
import phoneService from "./services/phone.js";
import Notification from "./components/Notifications.jsx";
import PhoneForm from "./components/PhoneForm.jsx";
import PhonePersonsList from "./components/PhonePersonsList.jsx";
import Filter from "./components/Filter.jsx";
import './index.css';


const App = () => {
    const[persons, setPersons] = useState([]);
    const[errorMessage, setErrorMessage] = useState('');
    const[infoMessage, setInfoMessage] = useState('');

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

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification status='info' message={infoMessage} />
            <Notification status='error' message={errorMessage} />
            <Filter persons={persons} setPersons={setPersons} />
            <PhoneForm persons={persons}  setPersons={setPersons} setInfoMessage={setInfoMessage} setErrorMessage={setErrorMessage}/>
            <PhonePersonsList persons={persons} setPersons={setPersons} setInfoMessage={setInfoMessage} />
        </div>
    )

}

export default App
