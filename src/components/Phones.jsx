const Phone = ({phone, handlePhoneDelete}) => {
    return(
        <li>{phone.content}<button onClick={handlePhoneDelete}> Delete </button></li>
    )
}
export default Phone