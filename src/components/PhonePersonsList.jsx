import Phone from "./Phones.jsx";
import phoneService from "../services/phone.js";

const PhonePersonsList = ({persons, setPersons, setInfoMessage}) => {

    const clearInfoMessage = () =>{
        setInfoMessage('')
    }

    const handlePhoneDelete = (id, name) =>{
        if(window.confirm(`delete ${name} ?`)){
            phoneService
                .deleteData(id)
                .then(_ => {
                    setInfoMessage(`${name} Deleted!`)
                    setTimeout(() => clearInfoMessage(), 2000)
                    setPersons(persons.filter((person) => person.id !== id))
                })
        }
    }
    return (
        <div>
            <h2>Numbers</h2>
            <div className="persons">
                <ul>
                    {persons.map((person) =>
                        <Phone key={person.id} phone={{content: `${person.name} - ${person.number}`}}
                               handlePhoneDelete={() => handlePhoneDelete(person.id, person.name)}/>)}
                </ul>
            </div>
        </div>
    )
}
export default PhonePersonsList