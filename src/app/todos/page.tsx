import { getTodos } from "../lib/data-service";
import EmptyTodo from "../components/emptytodo";
import TodosList from "../components/todoslist";



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
                <EmptyTodo />
            ) : (
                <TodosList todos={todos} />
            )}
        </div>
    );
}
