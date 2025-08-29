"use client";

import Link from "next/link";
import type { Todo } from "@/types/database";
import { redirect } from "next/navigation";

export default function DeleteConfirmation({ todo }: { todo: Todo }) {
  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }).then(() => {
      redirect(`/todos`);
    });
  };

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
        <div className="text-center mb-8">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Delete Todo</h1>
          <p className="text-gray-600">
            Are you sure you want to delete this todo? This action cannot be undone.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-red-800 mb-2">Todo to be deleted:</h3>
          <div className="space-y-2">
            <p className="text-red-700"><strong>Title:</strong> {todo.title}</p>
            <p className="text-red-700"><strong>Status:</strong> {todo.completed ? "Completed" : "Pending"}</p>
            <p className="text-red-700"><strong>Created:</strong> {new Date(todo.created_at).toLocaleString()}</p>
            <p className="text-red-700"><strong>ID:</strong> {todo.id}</p>
          </div>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            onClick={() => {
              deleteTodo(todo.id.toString());
            }}
          >
            Delete Todo
          </button>
          <Link
            href={`/todos/${todo.id}`}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}
