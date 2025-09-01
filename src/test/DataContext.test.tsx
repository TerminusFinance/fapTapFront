import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { DataProvider, useData } from '../components/otherViews/DataContext'

const TestComponent = () => {
  const { dataApp, energy } = useData()
  return (
    <div>
      <div data-testid="user-id">{dataApp.userId}</div>
      <div data-testid="energy">{energy}</div>
      <div data-testid="coins">{dataApp.coins}</div>
    </div>
  )
}

describe('DataContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides default values', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    )

    expect(screen.getByTestId('user-id')).toHaveTextContent('')
    expect(screen.getByTestId('energy')).toHaveTextContent('1000')
    expect(screen.getByTestId('coins')).toHaveTextContent('0')
  })

  it('loads data from localStorage', () => {
    const mockData = {
      userId: 'test123',
      userName: 'TestUser',
      coins: 500,
      codeToInvite: 'ABC123',
      address: '',
      currentEnergy: 800,
      maxEnergy: 1000,
      boosts: [],
      completedTasks: [],
      perTap: 1,
      enabledAirDrop: 0,
      antiBotChecker: 0,
      oneTimePremium: 0,
    }
    
    localStorage.setItem('dataApp', JSON.stringify(mockData))

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    )

    expect(screen.getByTestId('user-id')).toHaveTextContent('test123')
    expect(screen.getByTestId('energy')).toHaveTextContent('800')
    expect(screen.getByTestId('coins')).toHaveTextContent('500')
  })
})