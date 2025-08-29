import Link from "next/link";
import { notFound } from "next/navigation";
import { updateTodo } from "@/app/lib/actions";
import { redirect } from "next/navigation";

interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: string;
}

interface EditTodoPageProps {
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
    const todo = data.todos.find((t: Todo) => t.id === id);
    return todo || null;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    notFound();
  }

  async function handleUpdateTodo(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const completed = formData.get("completed") === "on";

    if (!title || title.trim().length === 0) {
      throw new Error("Title is required");
    }

    await updateTodo(todo?.id ?? "", title.trim(), completed);
    redirect(`/todos/${todo?.id}`);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href={`/todos/${todo.id}`}
          className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Todo</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Todo</h1>

        <form action={handleUpdateTodo} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={todo.title}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter todo title"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              defaultChecked={todo.completed}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
              Mark as completed
            </label>
          </div>

          <div className="flex space-x-4">
            <Link
              href={`/todos/${todo.id}`}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
