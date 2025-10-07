"use server";

import type { Todo } from "@/app/api/todos/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type TodoActionState = 
  | { status: 'error'; error: string }
  | { status: 'success'; message: string }
  | null

/**
 * Constructs a valid base URL for API calls that works in both development and production
 */
const getBaseUrl = (): string => {
  // In production on Vercel, use the deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Check for explicit API URL
  if (process.env.NEXT_PUBLIC_API_URL) {
    const url = process.env.NEXT_PUBLIC_API_URL;
    // If it already has a protocol, use it as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Otherwise, assume it needs https://
    return `https://${url}`;
  }

  // Fallback to localhost for development
  return "http://localhost:3000";
};

const baseUrl = getBaseUrl();

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
export async function createTodo(prevState: TodoActionState, formData: FormData): Promise<TodoActionState>{
    try {
        const title = formData.get("title") as string;
        const completed = formData.get("completed") === "on";
    
        if (!title || title.trim().length === 0) {
            return { status: 'error', error: 'Title is required' }
        }
    
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
        
        revalidatePath("/todos");
        redirect("/todos");

        return { 
            status: 'success', 
            message: 'Todo created successfully!' 
        }

    } catch {
        return { 
            status: 'error', 
            error: 'An unexpected error occurred' 
        }
    }
}

/**
 * Updates an existing todo
 */
export async function updateTodo(prevState:TodoActionState, formData: FormData): Promise<TodoActionState> {
    try {
        const title = formData.get("title") as string;
        const completed = formData.get("completed") === "on";
        const id = formData.get('id') as string
        
        if (!title || title.trim().length === 0) {
            return { status: 'error', error: 'Title is required' }
        }
    
        const response = await fetch(`${baseUrl}/api/todos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, title, completed }),
        });
    
        if (!response.ok) {
            throw new Error("Failed to create todo");
        }
    
        revalidatePath('/todos')
        redirect(`/todos`);

        return { 
            status: 'success', 
            message: 'Todo created successfully!' 
        }

    } catch {
        return { 
            status: 'error', 
            error: 'An unexpected error occurred' 
        }
    }
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
    revalidatePath('/todos')
    redirect('/todos')
}
