import { useEffect } from "react"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { useAnecdotesControls } from "./store"

const App = () => {
  const { initialize } = useAnecdotesControls()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <Notification /> 
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
