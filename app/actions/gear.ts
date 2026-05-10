'use server'

import { db } from '@/db'
import { items, itemCategoryEnum } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

type ItemCategory = typeof itemCategoryEnum.enumValues[number]

export async function createItem(formData: FormData) {
  const packId = Number(formData.get('packId'))
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const weight = Number(formData.get('weight'))
  const quantity = Number(formData.get('quantity'))
  const url = formData.get('url') as string
  const category = formData.get('category') as string

  if (!packId || !name) {
    return { error: 'Pack ID and name are required' }
  }

  await db.insert(items).values({
    packId,
    name,
    description,
    weight,
    quantity,
    url,
    category: category as ItemCategory,
  })

  revalidatePath('/dashboard')
}

export async function updateItem(id: number, formData: FormData) {
  const updateData: Partial<{
    name: string
    description: string
    weight: number
    quantity: number
    url: string
    category: ItemCategory
  }> = {}

  const name = formData.get('name')
  if (name) updateData.name = name as string

  const description = formData.get('description')
  if (description) updateData.description = description as string

  const weight = formData.get('weight')
  if (weight) updateData.weight = Number(weight)

  const quantity = formData.get('quantity')
  if (quantity) updateData.quantity = Number(quantity)

  const url = formData.get('url')
  if (url) updateData.url = url as string

  const category = formData.get('category')
  if (category) updateData.category = category as ItemCategory

  await db.update(items).set(updateData).where(eq(items.id, id))

  revalidatePath('/dashboard')
}

export async function deleteItem(id: number) {
  await db.delete(items).where(eq(items.id, id))
  revalidatePath('/dashboard')
}
