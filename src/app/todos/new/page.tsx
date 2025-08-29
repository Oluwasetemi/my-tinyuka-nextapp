import Link from "next/link";
import { createTodo } from "@/app/lib/actions";
import { redirect } from "next/navigation";

export default function NewTodoPage() {
  async function handleCreateTodo(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const completed = formData.get("completed") === "on";

    if (!title || title.trim().length === 0) {
      throw new Error("Title is required");
    }

    await createTodo(title.trim(), completed);
    redirect("/todos");
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Todo</h1>

        <form className="space-y-6" action={handleCreateTodo}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Todo Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter todo title..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="completed" className="ml-2 text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Todo
            </button>
            <Link
              href="/todos"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
