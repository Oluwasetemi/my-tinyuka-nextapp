import Link from "next/link";

interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: string;
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

async function getTodos(): Promise<Todo[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/todos`, {
    cache: "no-store", // Disable caching for real-time data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await response.json();
  return data.todos;
}

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          All Todos ({todos.length})
        </h2>
        <p className="text-gray-600">
          Click on a todo to view details or edit it
        </p>
      </div>

      {todos?.length === 0 || todos === null ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No todos</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new todo.
          </p>
          <div className="mt-6">
            <Link
              href="/todos/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              New Todo
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        className="w-2 h-2 text-white"
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
                  <div>
                    <h3
                      className={`text-lg font-medium ${
                        todo.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created {new Date(todo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/todos/${todo.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View
                  </Link>
                  <Link
                    href={`/todos/${todo.id}/edit`}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/todos/${todo.id}/delete`}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
