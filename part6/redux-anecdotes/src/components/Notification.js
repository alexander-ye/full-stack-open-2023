import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column'
  }

  return (
    <div style={style}>
      {notifications.map(notification => {
        return <p key={notification} style={{ margin: 0, padding: 0, }}>{notification}</p>
      })}
    </div>
  )
}

export default Notification