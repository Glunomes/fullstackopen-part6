
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.updateVote(id,
        {...anecdote, votes: anecdote.votes + 1}
      )
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? updated : anecdote
        )
    })
    )},
    add: async (content) => {
      const anecdote = await anecdoteService.addAnecdote(content)
      set(state => ({ 
        anecdotes: state.anecdotes.concat(anecdote)
      })
    )},
    deleteAnecdote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      if(!anecdote || anecdote.votes !== 0 ) {return}
      await anecdoteService.deleteAnecdote(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => 
          anecdote.id !== id)
      }))
    },
    setFilter: filter => set ({ filter }),
    initialize: async() => {
      const anecdotes = await anecdoteService.getAll()
      set (() => ({ anecdotes }))
    },
  },
}))


const useNotificationStore = create((set) => ({
  notification: '',
  setNotification: (notification) => {
    set({ notification })
    setTimeout(() => {
      set({ notification: ''})
    }, 5000)
  },
}))

export default useAnecdoteStore

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotesControls = () => useAnecdoteStore((state) => state.actions)

export const useNotifications = () => useNotificationStore((state) => state.notification)
export const useNotificationsControl = () => useNotificationStore((state) => state.setNotification)