# Ourpack - Backpacking Gear Management App

## Tech Stack
- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: NextAuth 5 (Credentials provider)
- **Styling**: Tailwind CSS 4
- **Testing**: Jest (unit), Playwright (E2E)

## Project Structure
```
ourpack/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   └── gear/          # Gear-specific components (GearList, AddItemModal, WeightGraph)
│   ├── dashboard/          # Dashboard page
│   ├── signin/             # Sign in page
│   ├── signup/             # Sign up page
│   ├── actions/            # Server actions
│   ├── api/                # API routes
│   └── lib/                # Client-side utilities
├── db/                     # Database layer
│   ├── schema.ts           # Drizzle schema (users, packs, items)
│   ├── index.ts            # DB export
│   └── seed.ts             # Seed data
├── drizzle/                # Drizzle migrations
├── __tests__/              # Jest unit tests
├── e2e/                    # Playwright E2E tests
└── docs/                   # Documentation
```

## Database Schema
- **users**: id, name, email, password_digest, timestamps
- **packs**: id, user_id (FK), timestamps
- **items**: id, name, description, weight, quantity, url, pack_id (FK), category, timestamps
- **Item categories**: pack_system, shelter, sleep_system, clothing, filtration_and_cookware, essentials, electronics, miscellaneous

## Auth Configuration
- NextAuth with Credentials provider
- Password hashing via bcryptjs
- Session callbacks extend user ID
- Secret: `BETTER_AUTH_SECRET` env var

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm test` - Run all tests
- `npm run test:unit` - Jest only
- `npm run test:e2e` - Playwright only
- `npm run db:seed` - Seed database

## Path Aliases
- `@/*` maps to root directory

## Key Files
- `auth.ts` - NextAuth initialization
- `auth.config.ts` - Auth providers config
- `drizzle.config.ts` - Drizzle ORM configuration
- `jest.config.js` - Jest configuration
- `playwright.config.ts` - Playwright configuration
