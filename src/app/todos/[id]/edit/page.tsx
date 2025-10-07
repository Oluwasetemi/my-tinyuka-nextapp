import Link from "next/link";
import { notFound } from "next/navigation";
import { getTodo } from "@/app/lib/data-service";
import UpdateTodoForm from "@/app/components/updatetodoform";

interface EditTodoPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  const todo = await getTodo(id);

  if (!todo) {
    notFound();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Todo</h1>
        <UpdateTodoForm todo={todo} id={id} />
      </div>
    </div>
  );
}
