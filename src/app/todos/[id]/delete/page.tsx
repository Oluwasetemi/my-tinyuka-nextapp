import DeleteConfirmation from "@/app/components/delete-confirmation";
import EmptyTodo from "@/app/components/emptytodo";
import { getTodo } from "@/app/lib/data-service";
import { Todo } from "@/app/types";

interface DeleteTodoPageProps {
    params: Promise<{ id: string }>;
}


export default async function DeleteTodoPage({ params }: DeleteTodoPageProps) {
    const { id } = await params;
    const todo = await getTodo(id) as Todo;

    if (!todo) {
        <EmptyTodo />
    }

    return <DeleteConfirmation todo={todo} />;
}
