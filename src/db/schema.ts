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

  // User status and role TODO: use enum next time
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
]);

export const todos = pgTable("todos", {
  // Primary key - auto-incrementing integer
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  // UUID for external references
  uuid: uuid().notNull().defaultRandom(),

  // Core todo fields
  title: varchar({ length: 255 }).notNull(),
  description: text(),

  // Status and priority
  status: text({ enum: ['pending', 'in_progress', 'completed', 'archived'] }).notNull().default('pending'),
  priority: text({ enum: ['low', 'medium', 'high', 'urgent'] }).notNull().default('medium'),

  // Completion tracking
  completed: boolean().notNull().default(false),
  completed_at: timestamp(),

  // Due date and scheduling
  due_date: date(),
  reminder_at: timestamp(),

  // User relationship
  user_id: integer().references(() => users.id, { onDelete: 'cascade' }),

  // Categorization
  category: varchar({ length: 50 }),
  tags: text(), // JSON array of tags stored as text

  // Order for drag-and-drop functionality
  sort_order: integer().default(0),

  // Soft delete support
  is_deleted: boolean().notNull().default(false),
  deleted_at: timestamp(),

  // Timestamps
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow()
}, (t) => [
  // Unique constraints
  unique().on(t.uuid),

  // Performance indexes
  index('idx_todos_user_id').on(t.id),
  index('idx_todos_status').on(t.status),
  index('idx_todos_completed').on(t.completed),
  index('idx_todos_due_date').on(t.due_date),
  index('idx_todos_priority').on(t.priority),
  index('idx_todos_created_at').on(t.created_at),
  index('idx_todos_sort_order').on(t.sort_order),
  index('idx_todos_is_deleted').on(t.is_deleted),

  // Composite indexes for common queries
  index('idx_todos_user_status').on(t.id, t.status),
  index('idx_todos_user_completed').on(t.id, t.completed),
  index('idx_todos_user_due_date').on(t.id, t.due_date)
]);
