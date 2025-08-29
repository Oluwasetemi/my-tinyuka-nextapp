import {
  integer,
  pgTable,
  varchar,
  uuid,
  boolean,
  date,
  text,
  timestamp,
  unique,
  index,
  primaryKey
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  // Primary key - auto-incrementing integer
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  // UUID field - not nullable
  uuid: uuid().notNull().defaultRandom(),

  // User credentials and basic info
  username: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  email_verified: boolean().default(false),
  password_hash: varchar({ length: 255 }).notNull(),

  // Personal information - nullable fields
  first_name: varchar({ length: 100 }),
  last_name: varchar({ length: 100 }),
  phone: varchar({ length: 20 }),
  date_of_birth: date(),

  // Profile information
  profile_picture_url: text(),
  bio: text(),

  // User status and role
  status: varchar({ length: 20 }).default('inactive'), // 'active', 'inactive', etc.
  role: varchar({ length: 20 }).default('user'), // 'user', 'admin', etc.

  // Timestamps
  last_login_at: timestamp(),
  email_verified_at: timestamp(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow()
}, (t) => [
  // Unique constraints
  unique().on(t.uuid),
  unique().on(t.username),
  unique().on(t.email),

  // Non-unique indexes for performance
  index('idx_users_username').on(t.username),
  index('idx_users_status').on(t.status),
  index('idx_users_email').on(t.email),
  index('idx_users_created_at').on(t.created_at)
]);``
