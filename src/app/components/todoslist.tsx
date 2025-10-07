import Link from "next/link";
import { Todo } from "../api/todos/route";

type TodosListProps = {
    todos: Todo[]
}

function TodosList({todos}: TodosListProps) {
    return (
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
    )
}

export default TodosList;
