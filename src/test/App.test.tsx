import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.querySelector('.app-container')).toBeInTheDocument()
  })

  it('has proper structure', () => {
    render(<App />)
    expect(document.querySelector('.app-container')).toBeInTheDocument()
  })
})