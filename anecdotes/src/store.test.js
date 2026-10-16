import { renderHook, act } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { useAnecdotes, useAnecdotesControls } from './store'
import anecdoteService from './services/anecdotes'
import useAnecdoteStore from './store'

vi.mock('./services/anecdotes')

describe('Anecdotes store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('initializes state with anecdotes from backend', async () => {
    const anecdotes = [
      { id: '1', content: 'If it hurts, do it more often', votes: 0 },
      { id: '2', content: 'Adding manpower to a late software project makes it later!', votes: 3 }
    ]

    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      actions: useAnecdotesControls()
    }))

    await act(async () => {
      await result.current.actions.initialize()
    })

    expect(anecdoteService.getAll).toHaveBeenCalledTimes(1)
    expect(result.current.anecdotes).toEqual(anecdotes)
  })

  test('voting increases the vote count of an anecdote', async () => {
  const anecdote = { id: '1', content: 'Testing anecdote votes', votes: 0 }
  useAnecdoteStore.setState({ anecdotes: [anecdote] })

  anecdoteService.updateVote.mockResolvedValue({ ...anecdote, votes: 1 })

  await useAnecdoteStore.getState().actions.addVote('1')

  expect(anecdoteService.updateVote).toHaveBeenCalledWith('1', { ...anecdote, votes: 1 })
  expect(useAnecdoteStore.getState().anecdotes[0].votes).toBe(1)
})
})