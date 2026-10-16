import { useAnecdotes, useAnecdotesControls, useFilter, useNotificationsControl } from "../store"

const AnecdoteList = () => {
  const filter = useFilter()
  const anecdotes  = useAnecdotes()
  const { addVote, deleteAnecdote } = useAnecdotesControls()
  const setNotification = useNotificationsControl()

  const handleVote = (anecdote) => {
    addVote(anecdote.id)
    setNotification(`You voted '${anecdote.content}'`)
  }

  const handleDelete = (anecdote) => {
    deleteAnecdote(anecdote.id)
    setNotification(`${anecdote} has been deleted`)
  }

  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)
  const anecdoteList = sortedAnecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && <button onClick={() => handleDelete(anecdote)}>delete</button>}
          </div>
      </div>
    ))
    
  return (
    <div>
      {anecdoteList}
    </div>
  )
}

export default AnecdoteList