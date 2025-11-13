
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
    try {
        const response = await fetch(`${baseUrl}/api/todos`, {
            cache: "force-cache", 
        });

        if (!response.ok) {
            // If response is not ok, it might be a 404 or other HTTP error,
            // but not necessarily a network error. We can still try to parse JSON
            // or handle it as an empty array if the API is expected to return an empty list.
            // For build time, if the API is not available, this will likely be caught by the outer catch.
            return [];
        }

        const data = await response.json();
        return data.todos;
    } catch (error) {
        console.error("Error fetching todos during build:", error);
        // Return an empty array if fetch fails, especially during build when API might not be running
        return [];
    }
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