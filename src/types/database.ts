import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { users, todos } from '@/db/schema';

// User types
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Todo types
export type Todo = InferSelectModel<typeof todos>;
export type NewTodo = InferInsertModel<typeof todos>;

// Request/Response types for API
// TODO: use zod next time with drizzle-zod
export interface CreateTodoRequest {
  readonly title: string;
  readonly description?: string;
  readonly status?: 'pending' | 'in_progress' | 'completed' | 'archived';
  readonly priority?: 'low' | 'medium' | 'high' | 'urgent';
  readonly completed?: boolean;
  readonly due_date?: Date; // ISO date string
  readonly user_id?: number;
  readonly category?: string;
  readonly tags?: string; // JSON array as string
  readonly sort_order?: number;
}

export interface UpdateTodoRequest {
  readonly id: number;
  readonly title?: string;
  readonly description?: string;
  readonly status?: 'pending' | 'in_progress' | 'completed' | 'archived';
  readonly priority?: 'low' | 'medium' | 'high' | 'urgent';
  readonly completed?: boolean;
  readonly completed_at?: string; // ISO timestamp
  readonly due_date?: string; // ISO date string
  readonly reminder_at?: string; // ISO timestamp
  readonly user_id?: number;
  readonly category?: string;
  readonly tags?: string; // JSON array as string
  readonly sort_order?: number;
}

export interface DeleteTodoRequest {
  readonly id: number;
}

// API Response types
export interface TodoResponse {
  readonly success: boolean;
  readonly data?: Todo;
  readonly message?: string;
  readonly error?: string;
}

export interface TodosResponse {
  readonly success: boolean;
  readonly data?: Todo[];
  readonly count?: number;
  readonly message?: string;
  readonly error?: string;
}

// Filter and query types
export interface TodoFilters {
  readonly user_id?: number;
  readonly status?: 'pending' | 'in_progress' | 'completed' | 'archived';
  readonly priority?: 'low' | 'medium' | 'high' | 'urgent';
  readonly completed?: boolean;
  readonly category?: string;
  readonly is_deleted?: boolean;
}

export interface TodoSortOptions {
  readonly field?: 'created_at' | 'updated_at' | 'due_date' | 'priority' | 'sort_order' | 'title';
  readonly order?: 'asc' | 'desc';
}

// Utility types
export type TodoStatus = Todo['status'];
export type TodoPriority = Todo['priority'];

// Partial types for updates
export type PartialTodo = Partial<Omit<Todo, 'id' | 'uuid' | 'created_at' | 'updated_at'>>;
