import Link from "next/link";
import { getTodos } from "@/app/lib/actions";

export const dynamic = "force-dynamic";



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
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No todos yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first todo
          </p>
          <Link
            href="/todos/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Create Your First Todo
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/todos/${todo.id}`}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    href={`/todos/${todo.id}/edit`}
                    className="text-green-600 hover:text-green-800 px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Edit
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
