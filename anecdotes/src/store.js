
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

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
    add: async (content) =>{
      const anecdote = await anecdoteService.addAnecdote(content)
      set(state => ({ 
        anecdotes: state.anecdotes.concat(anecdote)
      })
    )},
    setFilter: filter => set ({ filter }),
    initialize: async() => {
      const anecdotes = await anecdoteService.getAll()
      set (() => ({ anecdotes }))
    },
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotesControls = () => useAnecdoteStore((state) => state.actions)

