
import DeleteConfirmation from "@/app/components/delete-confirmation";
import { notFound } from "next/navigation";
import type { Todo } from "@/types/database";

interface DeleteTodoPageProps {
  params: Promise<{ id: string }>;
}

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

async function getTodo(id: string): Promise<Todo | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/todos`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const todo = data.todos.find((t: Todo) => t.id === parseInt(id));
    return todo || null;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
}

export default async function DeleteTodoPage({ params }: DeleteTodoPageProps) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    notFound();
  }

  return <DeleteConfirmation todo={todo} />;
}
