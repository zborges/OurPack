# 🏕️ Backpacking Gear Tracker (Monorepo)

A refactor of my first fully independent full-stack project — rebuilt with improved architecture, type safety, and scalability in mind.

This project is a CRUD web application that helps backpackers and hikers plan and optimize their gear for outdoor adventures.

---

## 📦 Project Overview

The Backpacking Gear Tracker allows users to:

- Create and manage gear lists for trips
- Categorize gear (e.g., Shelter, Food, Clothing, Essentials)
- Track individual item weights
- Automatically calculate total pack weight
- Visualize weight distribution through responsive graphs

The goal is to help users make smarter packing decisions and avoid overloading their packs.

---

## ⚙️ Tech Stack

### Backend
- Ruby on Rails (API mode)
- PostgreSQL
- ActiveRecord
- RESTful architecture

### Frontend
- React
- TypeScript
- Modern state management (Context / Redux / TBD)
- Data visualization (e.g., Chart.js / Recharts)

---

## 🚀 Features

- ✅ Full CRUD for gear items
- ✅ Category-based organization
- ✅ Weight tracking per item
- ✅ Total pack weight calculation
- ✅ Dynamic, responsive weight distribution graph
- ✅ Type-safe frontend with TypeScript
- 🔄 Ongoing refactor for performance and maintainability

- ## 📊 Core Concept

At the heart of the app is weight awareness.

Each item has:
- Name
- Category
- Weight

The app aggregates this data to:
- Compute total pack weight
- Display proportional weight distribution visually
- Help identify heavy or unnecessary items

---

## 🛠️ Getting Started

### Prerequisites

- Ruby (3.x recommended)
- Node.js (18+)
- PostgreSQL
- Yarn or npm

---

### Installation

#### 1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
#### 2. Setup Backend

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails server
```
#### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## 🔌 API Overview
The backend exposes RESTful endpoints for:
- Gear Items
- Categories
- Packs (Review of Pack)
- Example:
  ```bash
  GET    /api/v1/items
  POST   /api/v1/items
  PUT    /api/v1/items/:id
  DELETE /api/v1/items/:id
  ```
---

##  📈 Future Improvements
- Authentication & user accounts
- Trip-based gear lists
- Offline support / PWA
- Unit conversion (oz / g / lbs)
- Smarter weight recommendations
- Drag-and-drop gear organization

---
## 🧪 Testing
### API
```bash
cd api
bundle exec rspec
```

### Client
```bash
cd client
npm test

```
