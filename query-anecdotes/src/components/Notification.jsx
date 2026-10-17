import { useEffect } from "react"
import useNotification from "../hooks/useNotification"

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const {notification, setNotification} = useNotification()

  useEffect(() => {
    if(!notification) return

    const timer = setTimeout(() => { 
      setNotification(null) 
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification, setNotification])

  if (!notification) return null

  return (
  <div data-testid="notification" style={style}>
    {notification}
  </div>
  )
}

export default Notification
