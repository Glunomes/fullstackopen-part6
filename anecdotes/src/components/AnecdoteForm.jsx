import { useAnecdotesControls } from "../store"

const AnecdoteForm = () => {

  const { add } = useAnecdotesControls()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    add(content)
    event.target.reset()
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm