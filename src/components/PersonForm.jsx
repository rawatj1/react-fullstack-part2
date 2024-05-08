
const PersonForm = ({
                        newName,
                        newPhoneNo,
                        handleNewNameChange,
                        handlePhoneChange,
                        addPhoneDetails
                    }) => {
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
export default PersonForm