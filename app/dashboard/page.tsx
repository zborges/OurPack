import { auth } from '@/auth'
import { db } from '@/db'
import { packs } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { GearList } from '../components/gear/GearList'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/signin')
  }

  const userId = Number(session.user.id)

  // Find user's single pack
  const userPack = await db.query.packs.findFirst({
    where: eq(packs.userId, userId),
    with: {
      items: true,
    },
  })

  if (!userPack) {
    // Should not happen if signup creates pack, but handle gracefully
    redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-900">
      <header className="py-4 px-8 flex justify-between items-center bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-semibold">My Pack</h1>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <GearList items={userPack.items} packId={userPack.id} />
      </main>
    </div>
  )
}
