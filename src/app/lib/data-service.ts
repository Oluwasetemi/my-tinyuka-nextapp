
import { Todo } from "@/app/types";


/**
 * Constructs a valid base URL for API calls that works in both development and production
 */
export const getBaseUrl = (): string => {
    // In production on Vercel, use the deployment URL
    if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
    }

    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        // This might already include protocol, so we need to check
        const url = process.env.VERCEL_PROJECT_PRODUCTION_URL;
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
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



export async function getTodos(): Promise<Todo[]> {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/todos`, {
        cache: "force-cache", 
    });

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    const data = await response.json();
    return data.todos;
}

export async function getTodo(id: string): Promise<Todo | null> {
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/api/todos`, {
        cache: "force-cache",
      });
  
      if (!response.ok) {
        return null;
      }
  
      const data = await response.json();
      const todo = data.todos.find((t: Todo) => t.id === id);
      return todo || null;
    } catch (error) {
      console.error("Error fetching todo:", error);
      return null;
    }
  }