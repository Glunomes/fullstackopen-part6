import { render, screen } from '@testing-library/react'
import { describe, test, expect, beforeEach } from 'vitest'
import AnecdoteList from './AnecdoteList'
import useAnecdoteStore from '../store'

describe('<AnecdoteList />', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ filter: '' })
  })

  test('renders anecdotes sorted by votes in descending order', () => {
  const anecdotes = [
    { id: '1', content: 'Anecdote with lowest votes', votes: 1 },
    { id: '2', content: 'Anecdote with highest votes', votes: 15 },
    { id: '3', content: 'Anecdote with medium votes', votes: 7 }
  ]

  useAnecdoteStore.setState({ anecdotes })

  render(<AnecdoteList />)

  const items = screen.getAllByText(/Anecdote with/i)

  expect(items).toHaveLength(3)
  expect(items[0].textContent).toContain('Anecdote with highest votes')
  expect(items[1].textContent).toContain('Anecdote with medium votes')
  expect(items[2].textContent).toContain('Anecdote with lowest votes')
  })
  
  test('renders only anecdotes matching the filter', () => {
    const anecdotes = [
      { id: '1', content: 'React is a library for web and native interfaces', votes: 2 },
      { id: '2', content: 'Debugging is twice as hard as writing the code', votes: 5 },
      { id: '3', content: 'Full stack development with React and Vite', votes: 1 }
    ]

    useAnecdoteStore.setState({
      anecdotes,
      filter: 'react'
    })

    render(<AnecdoteList />)

    expect(screen.getByText('React is a library for web and native interfaces')).toBeDefined()
    expect(screen.getByText('Full stack development with React and Vite')).toBeDefined()
    expect(screen.queryByText('Debugging is twice as hard as writing the code')).toBeNull()
  })
})