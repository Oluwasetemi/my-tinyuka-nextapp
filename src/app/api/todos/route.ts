import { NextRequest, NextResponse } from "next/server";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

type ReadonlyTodo = Readonly<Todo>;

interface CreateTodoRequest {
  readonly title: string;
  readonly completed?: boolean;
}

interface UpdateTodoRequest {
  readonly id: string;
  readonly title?: string;
  readonly completed?: boolean;
}

interface DeleteTodoRequest {
  readonly id: string;
}

// In-memory storage (in production, use a database)
let todos: Todo[] = [
  {
    id: "1",
    title: "Learn Next.js App Router",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Build a todo application",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Deploy to production",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    todos,
    count: todos.length,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateTodoRequest = await request.json();

    // Validate input
    if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: (todos.length + 1).toString(),
      title: body.title.trim(),
      completed: body.completed ?? false,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);

    return NextResponse.json(
      { message: "Todo created successfully", todo: newTodo },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body: UpdateTodoRequest = await request.json();

    // Validate input
    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    const todoIndex = todos.findIndex((todo) => todo.id === body.id);

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    const updatedTodo: Todo = {
      ...todos[todoIndex],
      title: body.title?.trim() ?? todos[todoIndex].title,
      completed: body.completed ?? todos[todoIndex].completed,
    };

    todos[todoIndex] = updatedTodo;

    return NextResponse.json(
      { message: "Todo updated successfully", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const body: DeleteTodoRequest = await request.json();

    // Validate input
    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    const todoIndex = todos.findIndex((todo) => todo.id === body.id);

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: "Todo not found" },
        { status: 404 }
      );
    }

    const deletedTodo = todos[todoIndex];
    todos = todos.filter((todo) => todo.id !== body.id);

    return NextResponse.json(
      { message: "Todo deleted successfully", deletedTodo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }
}
