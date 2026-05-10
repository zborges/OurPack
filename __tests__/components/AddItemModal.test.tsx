import { render, screen, fireEvent, waitFor, act } from '../test-utils'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import fetchMock from 'jest-fetch-mock'
import type { Item } from '@/db/schema'

// Mock server actions before importing component
jest.mock('@/app/actions/gear', () => ({
  createItem: jest.fn(),
  updateItem: jest.fn(),
}))

import { AddItemModal } from '@/app/components/gear/AddItemModal'

const mockOnClose = jest.fn()
const mockOnItemAdded = jest.fn()
const mockOnItemUpdated = jest.fn()

const defaultProps = {
  isOpen: true,
  onClose: mockOnClose,
  packId: 1,
  onItemAdded: mockOnItemAdded,
  onItemUpdated: mockOnItemUpdated,
}

describe('AddItemModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'success' }))
  })

  it('renders when isOpen is true', () => {
    render(<AddItemModal {...defaultProps} />)

    expect(screen.getByText('Add New Item')).toBeInTheDocument()
    // Check that URL input with placeholder exists
    expect(screen.getByPlaceholderText('https://...')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<AddItemModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('Add New Item')).not.toBeInTheDocument()
  })

  it('renders Edit Item title when editingItem provided', () => {
    const editingItem: Item = {
      id: 1,
      name: 'Existing Item',
      weight: 1.5,
      quantity: 1,
      category: 'shelter',
      description: 'Test description',
      packId: 1,
      url: 'https://example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    render(<AddItemModal {...defaultProps} editingItem={editingItem} />)

    expect(screen.getByText('Edit Item')).toBeInTheDocument()
  })

  it('handles form input changes', () => {
    render(<AddItemModal {...defaultProps} />)

    const inputs = screen.getAllByRole('textbox')
    const nameInput = inputs[0]
    fireEvent.change(nameInput, { target: { value: 'New Tent' } })
    expect((nameInput as HTMLInputElement).value).toBe('New Tent')
  })

  it('calls onClose when cancel button clicked', () => {
    render(<AddItemModal {...defaultProps} />)

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(cancelBtn)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('closes modal after successful submit', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 1, name: 'Test Item', packId: 1 }))

    render(<AddItemModal {...defaultProps} />)

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'Test Item' } })

    const submitBtn = screen.getByRole('button', { name: 'Add Item' })
    await act(async () => {
      fireEvent.click(submitBtn)
    })

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it('renders all category options', () => {
    render(<AddItemModal {...defaultProps} />)

    const options = ['Pack System', 'Shelter', 'Sleep System', 'Clothing', 'Filtration & Cookware', 'Electronics', 'Essentials', 'Miscellaneous']
    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })
})