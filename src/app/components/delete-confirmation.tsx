"use client";

import Link from "next/link";
import { deleteTodoAction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import type { Todo } from "@/app/api/todos/route";

interface DeleteConfirmationProps {
  todo: Todo;
}

export default function DeleteConfirmation({ todo }: DeleteConfirmationProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteTodoAction(todo.id);
      router.push("/todos");
    } catch (error) {
      console.error("Failed to delete todo:", error);
      // You could add error handling UI here
    }
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
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Delete Todo
          </h1>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this todo? This action cannot be undone.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Todo Details:</h3>
          <p className="text-gray-700">
            <span className="font-medium">Title:</span> {todo.title}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                todo.completed
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Created:</span>{" "}
            {new Date(todo.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex space-x-4">
          <Link
            href={`/todos/${todo.id}`}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Delete Todo
          </button>
        </div>
      </div>
    </div>
  );
}
