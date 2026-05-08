import { hash } from 'bcryptjs'
import { db } from '@/db'
import { users, packs } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().optional(),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parseResult = signupSchema.safeParse(body)

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.message }, { status: 400 })
    }

    const { name, email, password } = parseResult.data

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const passwordDigest = await hash(password, 10)

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordDigest,
      })
      .returning()

    // Auto-create single pack for user
    const [newPack] = await db
      .insert(packs)
      .values({
        userId: newUser.id,
      })
      .returning()

    return NextResponse.json(
      { user: { id: newUser.id, email: newUser.email, name: newUser.name }, packId: newPack.id },
      { status: 201 },
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
