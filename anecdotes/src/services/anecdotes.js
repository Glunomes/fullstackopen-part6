const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if(!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const addAnecdote = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }

  const response = await fetch(baseUrl, options)

  if(!response.ok) {
    throw new Error ('Failed to create anecdote')
  }

  const data = await response.json()
  return data
}

const updateVote = async (id, note) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  } 

  const response = await fetch(`${baseUrl}/${id}`, options)

  if(!response.ok) {
    throw new Error ('Failed to create anecdote')
  }

  const data = await response.json()
  return data
}

const deleteAnecdote = async(id) => {
  const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' })

  if(!response.ok) {
    throw new Error ('Something went wrong')
  }
}

export default { getAll, addAnecdote, updateVote, deleteAnecdote }