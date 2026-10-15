import { useAnecdotes, useAnecdotesControls, useFilter } from "../store"

const AnecdoteList = () => {
  const filter = useFilter()
  const anecdotes  = useAnecdotes()
  const { addVote } = useAnecdotesControls()

  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const sortedAnecdotes = filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)
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