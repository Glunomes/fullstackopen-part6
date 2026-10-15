import { useAnecdotes, useAnecdotesControls } from "../store"

const AnecdoteList = () => {

  const anecdotes = useAnecdotes()
  const { addVote } = useAnecdotesControls()
  
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote.id)}>vote</button>
            </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList