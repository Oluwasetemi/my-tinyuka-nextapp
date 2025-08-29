import { getTodos } from "@/app/lib/actions";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const todos = await getTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  return NextResponse.json(todo);
}
