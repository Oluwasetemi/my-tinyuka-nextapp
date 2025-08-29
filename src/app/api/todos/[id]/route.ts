import { NextRequest, NextResponse } from "next/server";

interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: string;
}

// In-memory storage (in production, use a database)
const todos: Todo[] = [
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const body = await request.json();

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  // Update the todo
  todos[todoIndex] = {
    ...todos[todoIndex],
    title: body.title ?? todos[todoIndex].title,
    completed: body.completed ?? todos[todoIndex].completed,
  };

  return NextResponse.json(todos[todoIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  // Remove the todo
  todos.splice(todoIndex, 1);

  return NextResponse.json({ message: "Todo deleted successfully" });
}
