import Link from "next/link";

interface TodosLayoutProps {
  children: React.ReactNode;
}

export default function TodosLayout({ children }: TodosLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
              <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
            </div>
            <Link
              href="/todos/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + New Todo
            </Link>
          </div>
        </header>

        {/* Navigation */}
        <nav className="mb-6">
          <div className="flex space-x-4">
            <Link
              href="/todos"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              All Todos
            </Link>
            <Link
              href="/todos/new"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Create New
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}
