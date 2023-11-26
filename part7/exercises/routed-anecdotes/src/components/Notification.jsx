import { useEffect } from "react";

const Notification = ({notification, setNotification}) => {
  useEffect(() => {
    if (!notification) return;

    setTimeout(() => {
      setNotification('')
    }, 5000)
  }, [notification])

  if (!notification) return null;

  return (
    <div>
      {notification}
    </div>
  )
}

export default Notification