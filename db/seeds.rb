# frozen_string_literal: true

User.create!([
               {
                 email: 'jay@example.com',
                 password_digest: BCrypt::Password.create('password123'),
                 name: 'Jay'
               },
               { email: 'test@email.com',
                 password_digest: BCrypt::Password.create('password123'),
                 name: 'Test User' }
             ])

User.all.find_each do |u|
  Pack.find_or_create_by(user_id: u.id)
end

Item.create!([
               {
                 name: 'Hiking Pants',
                 description: 'Adjustable hiking pants. Can be shorts or pants',
                 weight: 13.6,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :clothing
               },
               {
                 name: 'Charging Block',
                 description: 'Portable charging block',
                 weight: 8.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :electronics
               },
               {
                 name: 'Black Diamond Trail Ergo Cork',
                 description: 'Trekking poles with aluminum shaft, cork handles, and an external lever lock.',
                 weight: 18.0,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :miscellaneous
               },
               {
                 name: 'HOKA ONE Speedgoat',
                 description: 'Durable trail running shoes with a 4mm heel-to-toe drop.',
                 weight: 21.6,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :footwear
               },
               {
                 name: 'ULA Circuit',
                 description: 'Pack capable of carrying up to 68L and 35 lbs.',
                 weight: 31.0,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :miscellaneous
               },
               {
                 name: 'REI Co-op Magma 15',
                 description: 'Sleeping bag capable of keeping the user warm in tempeartures as low as 16 degrees.',
                 weight: 28.2,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :sleep_system
               },
               {
                 name: 'Med Kit',
                 description: 'Med-Kit suitable for 2 people',
                 weight: 17.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :repair_and_medkit
               },
               {
                 name: 'Cheap Toothbrush',
                 description: 'An incredibly cheap toothbrush with the end cut off to save weight!',
                 weight: 2.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :miscellaneous
               },
               {
                 name: 'Therm-a-rest NeoAir XLite',
                 description: 'Lightweight insulated sleeping pad ',
                 weight: 18.0,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :sleep_system
               },
               {
                 name: 'Montbell Versatile',
                 description: 'Shell (rain jacket) includes inside pockets.',
                 weight: 8.0,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :clothing
               },
               {
                 name: 'FujiFilm Xt30 ',
                 description: 'Camera',
                 weight: 16.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :electronics
               },
               {
                 name: 'Huge band-aid collection',
                 description: 'Tons of band-aids for scrapes and cuts',
                 weight: 8.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :repair_and_medkit
               },
               {
                 name: 'Lightweight Sandals',
                 description: 'Perfect camp shoe, lightweight and comfortable',
                 weight: 6.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :footwear
               },
               {
                 name: 'Zpacks ArcHaul',
                 description: 'Lightweight Pack',
                 weight: 28.0,
                 quantity: 1,
                 url: 'https://zpacks.com/products/arc-haul-backpack',
                 pack_id: Pack.all.sample.id,
                 category: :miscellaneous
               },
               {
                 name: 'Darn Tough Socks ',
                 description: 'Durable wool socks',
                 weight: 2.3,
                 quantity: 2,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :clothing
               },
               {
                 name: 'Toothpaste',
                 description: 'Bio Friendly toothpaste. Keeping teeth clean!!',
                 weight: 4.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :miscellaneous
               },
               {
                 name: 'Functional Spork/Knife',
                 description: 'A great all around utensil',
                 weight: 3.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :filtration_and_cookware
               },
               {
                 name: 'SOTO Windmaster',
                 description: 'Lightweight stove.',
                 weight: 6.0,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :filtration_and_cookware
               },
               {
                 name: 'Sawyer Squeeze',
                 description: 'Water filter. Effectively removes 99.8% of bacteria from water.',
                 weight: 6.0,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :filtration_and_cookware
               },
               {
                 name: 'Bearikade Weekender',
                 description: 'Bear canister made of carbon fiber. Shield from the bears!',
                 weight: 31.0,
                 quantity: 2,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :miscellaneous
               },
               {
                 name: 'Smart Water Bottle',
                 description: 'lightweight bottle 32 oz.',
                 weight: 1.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :filtration_and_cookware
               },
               {
                 name: 'Super nice Stove',
                 description: 'Stove',
                 weight: 13.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :filtration_and_cookware
               },
               {
                 name: 'Soap ',
                 description: 'clean bar of soap',
                 weight: 6.0,
                 quantity: 1,
                 url: '',
                 pack_id: Pack.all.sample.id,
                 category: :miscellaneous
               },
               {
                 name: 'Zpacks Duplex',
                 description: 'Lightweight Tent. Very Durable.',
                 weight: 20.75,
                 quantity: 2,
                 url: 'https://zpacks.com/products/duplex-tent',
                 pack_id: Pack.all.sample.id,
                 category: :shelter
               },
               {
                 name: 'Zpacks 10 Degree Down Sleeping Bag',
                 description: 'Sleeping bag',
                 weight: 22.7,
                 quantity: 1,
                 url: nil,
                 pack_id: Pack.all.sample.id,
                 category: :sleep_system
               },
               {
                 name: 'Big Agnes TigerWall UL3',
                 description: 'A tent for 3. Lightweight and compact.',
                 weight: 33.6,
                 quantity: 1,
                 url: 'https://www.rei.com/product/128991/big-agnes-tiger-wall-ul3-tent',
                 pack_id: Pack.all.sample.id,
                 category: :shelter
               }
             ])
