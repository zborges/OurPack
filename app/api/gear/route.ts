import { db } from '@/db'
import { items } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { packId, name, description, weight, quantity, url, category } = body

    if (!packId || !name) {
      return NextResponse.json({ error: 'Pack ID and name are required' }, { status: 400 })
    }

    const [newItem] = await db
      .insert(items)
      .values({
        packId,
        name,
        description,
        weight,
        quantity,
        url,
        category,
      })
      .returning()

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error('Gear creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    await db.delete(items).where(eq(items.id, id))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Gear deletion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
