"use server";

import type { Todo } from "@/app/api/todos/route";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getTodos() {
  const todos = await fetch(`${baseUrl}/api/todos`);
  const data = await todos.json();
  return data.todos as Todo[];
}

/**
 * Creates a new todo
 */
export async function createTodo(title: string, completed: boolean = false): Promise<Todo> {
  const todos = await getTodos();

  const newTodo: Todo = {
    id: (todos.length + 1).toString(),
    title,
    completed,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(`${baseUrl}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return newTodo;
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
