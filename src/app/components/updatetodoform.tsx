'use client'

import Link from "next/link";
import { updateTodo } from "../lib/actions";
import { Todo } from "../types";
import { useActionState} from "react";
import { Spinner } from "@/components/ui/spinner";
import type { TodoActionState } from "../lib/actions";

type UpdateTodoFormProp = {
    todo: Todo,
    id: string
}

function UpdateTodoForm({todo, id}:UpdateTodoFormProp) {
    const [state, formAction, isPending] = useActionState(
        async (prevState: TodoActionState, formData: FormData) => {
            return await updateTodo(prevState, formData);
        },
        null
    );

    return (
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              disabled={isPending}
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
              disabled={isPending}
              name="completed"
              defaultChecked={todo.completed}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
              Mark as completed
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="hidden"
              defaultValue={id}
              name='id'
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          <div className="flex space-x-4">
            <Link
              href={`/todos`}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-1">
                    <Spinner/>
                    <p>Updating Todo</p>
                </span>
                
                ) : "Update Todo"}
            </button>
          </div>
        </form>
    )
}

export default UpdateTodoForm;
