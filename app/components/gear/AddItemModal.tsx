'use client'

import { useReducer } from 'react'
import { items } from '@/db/schema'
import { updateItem } from '@/app/actions/gear'

type Item = typeof items.$inferSelect;

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  packId: number;
  editingItem?: Item | null;
  onItemAdded?: (item: Item) => void;
  onItemUpdated?: (item: Item) => void;
}

const categoryOptions = [
  { value: 'pack_system', label: 'Pack System' },
  { value: 'shelter', label: 'Shelter' },
  { value: 'sleep_system', label: 'Sleep System' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'filtration_and_cookware', label: 'Filtration & Cookware' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'essentials', label: 'Essentials' },
  { value: 'miscellaneous', label: 'Miscellaneous' },
]

interface FormData {
  name: string;
  description: string;
  weight: string;
  quantity: number;
  url: string;
  category: string;
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormData; value: string | number }
  | { type: 'RESET' }

const createInitialState = (editingItem?: Item | null): FormData => ({
  name: editingItem?.name ?? '',
  description: editingItem?.description ?? '',
  weight: editingItem?.weight?.toString() ?? '',
  quantity: editingItem?.quantity ?? 1,
  url: editingItem?.url ?? '',
  category: editingItem?.category ?? 'shelter',
})

function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
  case 'SET_FIELD':
    return { ...state, [action.field]: action.value }
  case 'RESET':
    return createInitialState()
  default:
    return state
  }
}

export function AddItemModal({
  isOpen,
  onClose,
  packId,
  editingItem,
  onItemAdded,
  onItemUpdated,
}: AddItemModalProps) {
  const [formData, dispatch] = useReducer(formReducer, editingItem, createInitialState)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = new FormData()
    form.set('packId', packId.toString())
    form.set('name', formData.name)
    form.set('description', formData.description)
    form.set('weight', formData.weight)
    form.set('quantity', formData.quantity.toString())
    form.set('url', formData.url)
    form.set('category', formData.category)

    if (editingItem) {
      await updateItem(editingItem.id, form)
      onItemUpdated?.({ ...editingItem, ...formData } as unknown as Item)
    } else {
      const res = await fetch('/api/gear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId,
          ...formData,
          weight: Number(formData.weight),
          quantity: Number(formData.quantity),
        }),
      })

      if (res.ok) {
        const newItem = await res.json()
        onItemAdded?.(newItem)
      }
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Weight (lbs)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.weight}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'weight', value: e.target.value })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  dispatch({ type: 'SET_FIELD', field: 'quantity', value: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'category', value: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL (optional)</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                dispatch({ type: 'SET_FIELD', field: 'url', value: e.target.value })
              }
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800"
              placeholder="https://..."
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {editingItem ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
