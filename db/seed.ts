import { db } from './index'
import { users, packs, items, itemCategoryEnum } from './schema'
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

async function main() {
  console.log('Clearing existing data...')
  await db.delete(items)
  await db.delete(packs)
  await db.delete(users)
  console.log('Database cleared.')

  const defaultPassword = await hashPassword('password123')

  const seedUsers = [
    { name: 'Alex Chen', email: 'alex@example.com' },
    { name: 'Jordan Miller', email: 'jordan@example.com' },
    { name: 'Sam Rivera', email: 'sam@example.com' },
    { name: 'Taylor Brooks', email: 'taylor@example.com' },
    { name: 'Morgan Hayes', email: 'morgan@example.com' },
  ]

  console.log('Seeding users...')
  const insertedUsers: { id: number }[] = []
  for (let i = 0; i < seedUsers.length; i++) {
    const [user] = await db
      .insert(users)
      .values({
        name: seedUsers[i].name,
        email: seedUsers[i].email,
        passwordDigest: defaultPassword,
      })
      .returning()
    insertedUsers.push(user)
  }

  console.log('Seeding packs...')
  const insertedPacks: { id: number }[] = []
  for (let i = 0; i < insertedUsers.length; i++) {
    const [pack] = await db
      .insert(packs)
      .values({
        userId: insertedUsers[i].id,
      })
      .returning()
    insertedPacks.push(pack)
  }

  const packItems = [
    // Pack 1: Ultralight setup
    [
      { name: 'Zpacks Duplex Tent', description: 'Ultralight 2P tent', weight: 19, quantity: 1, category: 'shelter' },
      { name: 'Enlightened Equipment Quilt', description: '20F down quilt', weight: 20, quantity: 1, category: 'sleep_system' },
      { name: 'Dyneema Rain Jacket', description: 'Waterproof breathable', weight: 7, quantity: 1, category: 'clothing' },
      { name: 'Sawyer Squeeze', description: 'Water filter 0.1 micron', weight: 3, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Jetboil Flash', description: 'Integrated stove system', weight: 13, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Garmin inReach Mini', description: 'Satellite communicator', weight: 3.5, quantity: 1, category: 'electronics' },
      { name: 'Headlamp', description: 'Black Diamond Spot 350', weight: 3, quantity: 1, category: 'essentials' },
      { name: 'First Aid Kit', description: 'Ultralight kit', weight: 4, quantity: 1, category: 'essentials' },
      { name: 'Trekking Poles', description: 'Carbon fiber collapsible', weight: 12, quantity: 1, category: 'pack_system' },
      { name: 'Stuff Sack Set', description: 'Silnylon various sizes', weight: 2, quantity: 3, category: 'miscellaneous' },
    ],
    // Pack 2: Family camping
    [
      { name: 'REI Half Dome 4', description: '4P family tent', weight: 103, quantity: 1, category: 'shelter' },
      { name: 'Coleman Sleeping Bag', description: '30F synthetic', weight: 45, quantity: 1, category: 'sleep_system' },
      { name: 'Fleece Jacket', description: 'REI Co-op fleece', weight: 14, quantity: 1, category: 'clothing' },
      { name: 'MSR Guardian', description: 'Purifier pump filter', weight: 17, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Camp Stove', description: '2-burner propane', weight: 78, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Lantern', description: 'LED rechargeable', weight: 12, quantity: 1, category: 'electronics' },
      { name: 'Cooler', description: '25L soft cooler', weight: 32, quantity: 1, category: 'miscellaneous' },
      { name: 'Camp Chairs', description: 'Inflatable chairs', weight: 24, quantity: 2, category: 'miscellaneous' },
      { name: 'Bear Canister', description: 'BV500 approved', weight: 44, quantity: 1, category: 'essentials' },
      { name: 'Rope', description: '50ft paracord', weight: 8, quantity: 1, category: 'pack_system' },
    ],
    // Pack 3: Winter camping
    [
      { name: 'Hilleberg Soulo', description: '4-season 1P tent', weight: 77, quantity: 1, category: 'shelter' },
      { name: 'Western Mountaineering Bag', description: '-20F down bag', weight: 52, quantity: 1, category: 'sleep_system' },
      { name: 'Down Parka', description: '800 fill expedition', weight: 24, quantity: 1, category: 'clothing' },
      { name: 'Insulated Pants', description: 'Primaloft synthetic', weight: 16, quantity: 1, category: 'clothing' },
      { name: 'Thermos', description: '40oz vacuum insulated', weight: 18, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Stove', description: 'White gas expedition', weight: 23, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Avalanche Beacon', description: 'Pieps DSP Sport', weight: 8, quantity: 1, category: 'electronics' },
      { name: 'Snow Shovel', description: 'Carbon blade', weight: 28, quantity: 1, category: 'essentials' },
      { name: 'Probe', description: '280cm avalanche', weight: 14, quantity: 1, category: 'essentials' },
      { name: 'Crampons', description: 'Steel 12-point', weight: 42, quantity: 1, category: 'miscellaneous' },
    ],
    // Pack 4: Thru-hiker setup
    [
      { name: 'Gossamer Gear Mariposa', description: '60L ultralight pack', weight: 31, quantity: 1, category: 'pack_system' },
      { name: 'Tarptent StratoSpire', description: '2P trekking pole tent', weight: 32, quantity: 1, category: 'shelter' },
      { name: 'Therm-a-Rest NeoAir', description: 'XLite sleeping pad', weight: 12, quantity: 1, category: 'sleep_system' },
      { name: 'Rain Kilt', description: 'Silnylon wind/rain', weight: 4, quantity: 1, category: 'clothing' },
      { name: 'Potty Trowel', description: 'Zpacks titanium', weight: 0.6, quantity: 1, category: 'essentials' },
      { name: 'Water Bottles', description: 'CN 1L x2', weight: 2, quantity: 2, category: 'filtration_and_cookware' },
      { name: 'Aquatabs', description: 'Water treatment tabs', weight: 1, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Phone', description: 'iPhone SE charging case', weight: 8, quantity: 1, category: 'electronics' },
      { name: 'Power Bank', description: '10000mAh Anker', weight: 7, quantity: 1, category: 'electronics' },
      { name: 'Sit Pad', description: 'Closed cell foam', weight: 3, quantity: 1, category: 'miscellaneous' },
    ],
    // Pack 5: Minimalist day-to-overnight
    [
      { name: 'Tarp', description: '8x10 silnylon', weight: 16, quantity: 1, category: 'shelter' },
      { name: 'Ground Sheet', description: 'Tyvek footprint', weight: 4, quantity: 1, category: 'shelter' },
      { name: 'Bivy Sack', description: 'Emergency bivy', weight: 8, quantity: 1, category: 'sleep_system' },
      { name: 'Puffy Jacket', description: 'Down 700 fill', weight: 14, quantity: 1, category: 'clothing' },
      { name: 'Base Layer', description: 'Merino wool top', weight: 6, quantity: 1, category: 'clothing' },
      { name: 'Pot', description: '750ml titanium', weight: 4, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Spork', description: 'Titanium long handle', weight: 0.6, quantity: 1, category: 'filtration_and_cookware' },
      { name: 'Map & Compass', description: 'Nat Geo + Silva', weight: 3, quantity: 1, category: 'essentials' },
      { name: 'Whistle', description: 'Safety whistle', weight: 0.5, quantity: 1, category: 'essentials' },
      { name: 'Trash Bag', description: 'Opsak odor proof', weight: 1, quantity: 2, category: 'miscellaneous' },
    ],
  ]

  console.log('Seeding items...')
  for (let i = 0; i < packItems.length; i++) {
    const packId = insertedPacks[i].id
    const itemsData = packItems[i].map((item) => ({
      ...item,
      packId,
      category: item.category as (typeof itemCategoryEnum)['enumValues'][number],
    }))

    await db.insert(items).values(itemsData)

    console.log(`  Pack ${i + 1}: ${itemsData.length} items seeded`)
  }

  console.log('\nSeeding complete!')
  console.log(`  Users: ${insertedUsers.length}`)
  console.log(`  Packs: ${insertedPacks.length}`)
  console.log(`  Items: ${packItems.reduce((acc, items) => acc + items.length, 0)}`)
  console.log('\nLogin with any user email and password: password123')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
