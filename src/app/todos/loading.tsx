import { getTodos } from "../lib/data-service";

export default async function TodosLoading() {
    const todos = await getTodos();
    return (
        <div className="animate-pulse">
            <div className="space-y-4">
                {/* Loading skeleton for todo items */}
                {Array.from({ length: todos.length }).map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-16 h-8 bg-gray-200 rounded"></div>
                        <div className="w-16 h-8 bg-gray-200 rounded"></div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}
