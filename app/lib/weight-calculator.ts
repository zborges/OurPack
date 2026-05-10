import { items } from '@/db/schema'

type Item = typeof items.$inferSelect;

export interface CategoryWeight {
  category: string;
  totalWeight: number;
  itemCount: number;
}

export function calculateTotalWeight(itemList: Item[]): number {
  return itemList.reduce((sum, item) => {
    const itemTotal = (item.weight ?? 0) * (item.quantity ?? 1)
    return sum + itemTotal
  }, 0)
}

const ALL_CATEGORIES = [
  'pack_system',
  'shelter',
  'sleep_system',
  'clothing',
  'filtration_and_cookware',
  'essentials',
  'electronics',
  'miscellaneous',
]

export function calculateCategoryWeights(itemList: Item[]): CategoryWeight[] {
  const categoryMap = new Map<string, { totalWeight: number; itemCount: number }>()

  // Initialize all categories with 0
  ALL_CATEGORIES.forEach((cat) => {
    categoryMap.set(cat, { totalWeight: 0, itemCount: 0 })
  })

  itemList.forEach((item) => {
    const category = item.category ?? 'miscellaneous'
    const itemTotal = (item.weight ?? 0) * (item.quantity ?? 1)

    const existing = categoryMap.get(category) || { totalWeight: 0, itemCount: 0 }
    categoryMap.set(category, {
      totalWeight: existing.totalWeight + itemTotal,
      itemCount: existing.itemCount + (item.quantity ?? 1),
    })
  })

  return Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    totalWeight: data.totalWeight,
    itemCount: data.itemCount,
  }))
}

export function calculateCategoryPercentages(itemList: Item[]): CategoryWeight[] {
  const total = calculateTotalWeight(itemList)
  if (total === 0) return []

  const categoryWeights = calculateCategoryWeights(itemList)
  return categoryWeights.map((cat) => ({
    ...cat,
    totalWeight: (cat.totalWeight / total) * 100,
  }))
}
