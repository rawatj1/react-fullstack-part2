const Notification = ({status, message}) => {
    if(message === null || message.length === 0){
        return null
    }
    return(
        <div className={status}>{message}</div>
    )
}
export default Notification;