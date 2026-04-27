import {
  pgTable,
  serial,
  text,
  varchar,
  real,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const itemCategoryEnum = pgEnum("item_category", [
  "shelter",
  "sleep_system",
  "clothing",
  "filtration_and_cookware",
  "toiletries",
  "repair_and_medkit",
  "electronics",
  "footwear",
  "miscellaneous",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  passwordDigest: text("password_digest"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const packs = pgTable("packs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  weight: real("weight"),
  quantity: integer("quantity"),
  url: varchar("url", { length: 512 }),
  packId: integer("pack_id").notNull().references(() => packs.id),
  category: itemCategoryEnum("category").notNull().default("shelter"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  packs: many(packs),
}));

export const packsRelations = relations(packs, ({ one, many }) => ({
  user: one(users, {
    fields: [packs.userId],
    references: [users.id],
  }),
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  pack: one(packs, {
    fields: [items.packId],
    references: [packs.id],
  }),
}));
