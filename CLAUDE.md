# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Backpacking Gear Tracker - CRUD app for managing hiking gear, tracking weights, and visualizing pack weight distribution.

## Tech Stack

**Backend (api/)**
- Rails 7.0 API mode
- PostgreSQL
- Ruby 3.2.0
- RSpec for testing

**Frontend (client/)**
- React 19 + TypeScript
- Vite
- TanStack Router
- Tailwind CSS v4

## Commands

### Backend
```bash
cd api
bundle install                    # Install dependencies
rails server                      # Start API server
rails db:create db:migrate db:seed
bundle exec rspec                 # Run tests
bundle exec rspec spec/models     # Run specific test directory
```

### Frontend
```bash
cd client
npm install
npm run dev                       # Start dev server (Vite)
npm run build                     # Build for production
npm run lint
npm test
```

## Architecture

**Monorepo structure:**
- `api/` - Rails API backend
- `client/` - React + TypeScript frontend

**Backend patterns:**
- Namespace routing under `/api` (see `config/routes.rb`)
- Models: `User` → `Pack` → `Item` (belongs_to/has_many chain)
- User has one Pack, Pack has many Items
- Items use enum for categories

**Frontend patterns:**
- File-based routing with TanStack Router (routes in `src/routes/`)
- Auto-generated route tree at `src/routeTree.gen.ts`
- Components organized by feature

## Authentication

- Backend: `has_secure_password` on User model
- Endpoints: `POST /api/sessions` (login), `POST /api/users` (signup)
- Frontend: Auth routes at `/sign-in`, `/sign-up`
