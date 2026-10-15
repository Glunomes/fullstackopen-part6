import { useAnecdotes, useAnecdotesControls } from "../store"

const AnecdoteList = () => {

  const anecdotes = useAnecdotes()
  const { addVote } = useAnecdotesControls()
  
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const anecdoteList = sortedAnecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
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