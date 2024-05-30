import Phone from "./Phones.jsx";
import phoneService from "../services/phone.js";

const PhonePersonsList = ({persons, setPersons, setInfoMessage, setErrorMessage}) => {

    const clearInfoMessage = () => {
        setInfoMessage('')
    }

    const clearErrorMessage = () => {
        setErrorMessage('')
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
                .catch(error => {
                    console.log(error)
                    setTimeout(() => clearErrorMessage(), 2000)
                    if(error.response.status === 404 ){
                        setErrorMessage(`Information ${name} is already deleted from the server`)
                    } else {
                        setErrorMessage(`Error deleting ${name}: ${error.message}`)
                    }

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