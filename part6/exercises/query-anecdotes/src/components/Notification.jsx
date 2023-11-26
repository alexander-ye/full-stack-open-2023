import { useContext, useEffect } from "react";
import { NotificationContext } from "../contexts";

const Notification = ({message}) => {

  const { notificationDispatch } = useContext(NotificationContext)

  useEffect(() => {
    if (!message) return;

    setTimeout(() => {
      notificationDispatch({type: 'CLEAR_NOTIFICATION'})
    }, 5000)
  }, [message])

  if (!message) return null;

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5
}