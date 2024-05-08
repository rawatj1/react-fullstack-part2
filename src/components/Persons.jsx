import Note from "./Notes.jsx";
const Persons = ({persons}) => {
    return (
        <div className="persons">
            <ul>
                {persons.map((person, index) => <Note key={person.id}
                                                            note={{content: `${person.name} - ${person.number}`}}/>)}
            </ul>
        </div>
    )
}

export default Persons