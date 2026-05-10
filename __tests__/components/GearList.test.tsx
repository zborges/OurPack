import { render, screen, waitFor, act } from '../test-utils'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import fetchMock from 'jest-fetch-mock'

// Mock server actions and AddItemModal child component
jest.mock('@/app/actions/gear', () => ({
  createItem: jest.fn(),
  updateItem: jest.fn(),
}))

jest.mock('@/app/components/gear/AddItemModal', () => ({
  AddItemModal: function MockAddItemModal({ isOpen, onClose, onItemAdded, onItemUpdated }: any) {
    if (!isOpen) return null
    return (
      <div data-testid="add-item-modal">
        <button onClick={onClose}>Close Modal</button>
        <button onClick={() => onItemAdded?.({ id: 99, name: 'Added Item' })}>Simulate Add</button>
        <button onClick={() => onItemUpdated?.({ id: 1, name: 'Updated Item' })}>Simulate Update</button>
      </div>
    )
  },
}))

import { GearList } from '@/app/components/gear/GearList'

const mockItems = [
  { id: 1, name: 'Tent', weight: 2.5, quantity: 1, category: 'shelter', description: '3-season tent', packId: 1, url: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Sleeping Bag', weight: 1.5, quantity: 1, category: 'sleep_system', description: 'Down sleeping bag', packId: 1, url: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: 'Rain Jacket', weight: 0.5, quantity: 2, category: 'clothing', description: null, packId: 1, url: null, createdAt: new Date(), updatedAt: new Date() },
] as const

describe('GearList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'success' }))
  })

  it('renders gear items', () => {
    render(<GearList items={[...mockItems]} packId={1} />)

    expect(screen.getByText('Tent')).toBeInTheDocument()
    expect(screen.getByText('Sleeping Bag')).toBeInTheDocument()
    expect(screen.getByText('Rain Jacket')).toBeInTheDocument()
  })

  it('renders empty state when no items', () => {
    render(<GearList items={[]} packId={1} />)

    expect(screen.getByText(/No items/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument()
  })

  it('filters by category', async () => {
    render(<GearList items={[...mockItems]} packId={1} />)

    // Click shelter filter (lowercase "all" is the button text)
    const shelterBtn = screen.getByRole('button', { name: 'Shelter' })
    await act(async () => {
      shelterBtn.click()
    })

    expect(screen.getByText('Tent')).toBeInTheDocument()
    expect(screen.queryByText('Sleeping Bag')).not.toBeInTheDocument()
  })

  it('shows all categories when "all" selected', async () => {
    render(<GearList items={[...mockItems]} packId={1} />)

    // "all" is lowercase in the component
    const allBtn = screen.getByRole('button', { name: 'all' })
    await act(async () => {
      allBtn.click()
    })

    expect(screen.getByText('Tent')).toBeInTheDocument()
    expect(screen.getByText('Sleeping Bag')).toBeInTheDocument()
    expect(screen.getByText('Rain Jacket')).toBeInTheDocument()
  })

  it('displays weight calculations correctly', () => {
    render(<GearList items={[...mockItems]} packId={1} />)

    // Rain Jacket has quantity 2, weight 0.5 each = 1.0 lbs total
    expect(screen.getAllByText(/1\.00 lbs/)).toHaveLength(3)
  })

  it('opens modal on Add Item click', async () => {
    render(<GearList items={[]} packId={1} />)

    const addBtn = screen.getByRole('button', { name: 'Add Item' })
    await act(async () => {
      addBtn.click()
    })

    expect(screen.getByText('Close Modal')).toBeInTheDocument()
  })

  it('displays category filter buttons', () => {
    render(<GearList items={[...mockItems]} packId={1} />)

    expect(screen.getByRole('button', { name: 'Shelter' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sleep System' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clothing' })).toBeInTheDocument()
  })
})