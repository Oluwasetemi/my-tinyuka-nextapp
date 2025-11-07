import { getTodo, getTodos } from "@/app/lib/data-service";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TodoPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const todos = await getTodos()
    return todos.map(todo => ({
        id: todo.id.toString()
    }))
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
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              todo.completed
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 text-lg text-gray-900">
              {todo.completed ? "Completed" : "In Progress"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Created</h3>
            <p className="mt-1 text-lg text-gray-900">
              {new Date(todo.createdAt).toLocaleDateString()} at{" "}
              {new Date(todo.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">ID</h3>
            <p className="mt-1 text-lg text-gray-900 font-mono">{todo.id}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Link
            href={`/todos/${todo.id}/edit`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Edit Todo
          </Link>
          <Link
            href={`/todos/${todo.id}/delete`}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Delete Todo
          </Link>
        </div>
      </div>
    </div>
  );
}
