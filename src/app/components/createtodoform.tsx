'use client';


import Link from "next/link";
import { createTodo } from "@/app/lib/actions";
import { useActionState } from "react";
import type { TodoActionState } from "@/app/lib/actions";

function CreateTodoForm() {
    const [state, formAction, isPending] = useActionState(
        async (prevState: TodoActionState, formData: FormData) => {
            return await createTodo(prevState, formData);
        },
        null
    );

    return (
        <form className="space-y-6" action={formAction}>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Todo Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    disabled={isPending}
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
                    disabled={isPending}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="completed" className="ml-2 text-sm text-gray-700">
                    Mark as completed
                </label>
            </div>

            <div className="flex space-x-4">
                <button
                    disabled={isPending}
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
    )
}

export default CreateTodoForm;
