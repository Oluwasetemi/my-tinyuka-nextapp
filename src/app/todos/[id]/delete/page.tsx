
import DeleteConfirmation from "@/app/components/delete-confirmation";
import { notFound } from "next/navigation";
import type { Todo } from "@/app/api/todos/route";

interface DeleteTodoPageProps {
  params: Promise<{ id: string }>;
}

async function getTodo(id: string): Promise<Todo | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/todos`, {
      cache: "no-store",
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

export default async function DeleteTodoPage({ params }: DeleteTodoPageProps) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    notFound();
  }

  return <DeleteConfirmation todo={todo} />;
}
