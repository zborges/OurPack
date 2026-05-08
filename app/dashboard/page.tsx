import { auth } from '@/auth'
import { db } from '@/db'
import { packs, items } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { GearList } from '../components/gear/GearList'
import { WeightGraph } from '../components/gear/WeightGraph'
import { calculateTotalWeight, calculateCategoryWeights } from '../lib/weight-calculator'

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

  const totalWeight = calculateTotalWeight(userPack.items)
  const categoryWeights = calculateCategoryWeights(userPack.items)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-900">
      <header className="py-4 px-8 flex justify-between items-center bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-semibold">My Pack</h1>
        <div className="text-lg">
          Total: <span className="font-bold">{totalWeight.toFixed(2)} lbs</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GearList items={userPack.items} packId={userPack.id} />
          </div>
          <div>
            <WeightGraph categoryWeights={categoryWeights} totalWeight={totalWeight} />
          </div>
        </div>
      </main>
    </div>
  )
}
