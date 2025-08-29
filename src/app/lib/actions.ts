"use server";

import type { Todo } from "@/app/api/todos/route";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${baseUrl}/api/todos`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await response.json();
  return data.todos;
}

/**
 * Creates a new todo
 */
export async function createTodo(title: string, completed: boolean = false): Promise<Todo> {
  const response = await fetch(`${baseUrl}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  const data = await response.json();
  return data.todo;
}

/**
 * Updates an existing todo
 */
export async function updateTodo(id: string, title: string, completed: boolean): Promise<Todo> {
  const response = await fetch(`${baseUrl}/api/todos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, completed }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  const data = await response.json();
  return data.todo as Todo;
}

/**
 * Deletes a todo
 */
export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${baseUrl}/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}

/**
 * Server action for deleting a todo (for use in client components)
 */
export async function deleteTodoAction(id: string): Promise<void> {
  await deleteTodo(id);
}
