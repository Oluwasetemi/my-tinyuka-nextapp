import Link from "next/link";
import { notFound } from "next/navigation";

interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: string;
}

interface TodoPageProps {
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

export default async function TodoPage({ params }: TodoPageProps) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/todos"
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
          <span>Back to Todos</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{todo.title}</h1>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              todo.completed
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Status
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  todo.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-gray-900">
                {todo.completed ? "Completed" : "Not completed"}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Created
            </h3>
            <p className="text-gray-900 mt-1">
              {new Date(todo.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Todo ID
            </h3>
            <p className="text-gray-900 mt-1 font-mono text-sm">{todo.id}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Link
            href={`/todos/${todo.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Edit Todo
          </Link>
          <Link
            href={`/todos/${todo.id}/delete`}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Delete Todo
          </Link>
        </div>
      </div>
    </div>
  );
}
