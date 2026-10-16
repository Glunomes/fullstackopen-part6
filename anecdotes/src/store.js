
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVote: id => set(
      state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? {...anecdote, votes: anecdote.votes+1} : anecdote
        )
    })
    ),
    add: anecdote => set(
      state => ({ 
        anecdotes: state.anecdotes.concat(asObject(anecdote)
        )
      })
    ),
    setFilter: filter => set ({ filter }),
    initialize: async() => {
      const anecdotes = await anecdoteService.getAll()
      set (() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotesControls = () => useAnecdoteStore((state) => state.actions)

