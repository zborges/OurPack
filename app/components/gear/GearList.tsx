'use client'

import { useState, useMemo } from 'react'
import { items } from '@/db/schema'
import { AddItemModal } from './AddItemModal'
import { WeightGraph } from './WeightGraph'
import { calculateTotalWeight, calculateCategoryWeights } from '@/app/lib/weight-calculator'

type Item = typeof items.$inferSelect;

interface GearListProps {
  items: Item[];
  packId: number;
}

const categoryLabels: Record<string, string> = {
  pack_system: 'Pack System',
  shelter: 'Shelter',
  sleep_system: 'Sleep System',
  clothing: 'Clothing',
  filtration_and_cookware: 'Filtration & Cookware',
  electronics: 'Electronics',
  essentials: 'Essentials',
  miscellaneous: 'Miscellaneous',
}
export function GearList({ items: initialItems, packId }: GearListProps) {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Object.keys(categoryLabels)]

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory)

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this item?')) return

    const res = await fetch('/api/gear', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      setItems(items.filter((i) => i.id !== id))
    }
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleItemAdded = (newItem: Item) => {
    setItems([...items, newItem])
  }

  const handleItemUpdated = (updatedItem: Item) => {
    setItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)))
  }

  const totalWeight = useMemo(() => calculateTotalWeight(items), [items])
  const categoryWeights = useMemo(() => calculateCategoryWeights(items), [items])

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:hidden">
        <WeightGraph categoryWeights={categoryWeights} totalWeight={totalWeight} />
      </div>

      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Gear Items</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Add Item
          </button>
        </div>

        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {filteredItems.length === 0 ? (
            <p className="p-8 text-center text-zinc-500">
              No items{selectedCategory !== 'all' ? ` in ${categoryLabels[selectedCategory]}` : ''}. Add your first item above.
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 flex justify-between items-start hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-zinc-500">
                    {Number(item.weight)?.toFixed(2) ?? 0} lbs × {item.quantity ?? 1} ={' '}
                    {((item.weight ?? 0) * (item.quantity ?? 1)).toFixed(2)} lbs
                  </p>
                  {item.description && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {item.description}
                    </p>
                  )}
                  <p className="text-xs text-zinc-400 mt-1">
                    {categoryLabels[item.category] || item.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:w-80 shrink-0">
        <WeightGraph categoryWeights={categoryWeights} totalWeight={totalWeight} />
      </div>

      <AddItemModal
        key={editingItem?.id ?? 'new'}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        packId={packId}
        editingItem={editingItem}
        onItemAdded={handleItemAdded}
        onItemUpdated={handleItemUpdated}
      />
    </div>
  )
}
