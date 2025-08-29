import { Todo } from "@/app/api/todos/route";

async function getTodos() {
  const todos = await fetch("/api/todos");
  return todos.json() as Promise<Todo[]>;
}

async function postTodo(todo: Todo) {
  await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  });
}

export async function createTodo(title: string, completed: boolean) {
  const todos = await getTodos();

  const newTodo: Todo = {
    id: (todos.length + 1).toString(),
    title,
    completed,
    createdAt: new Date().toISOString(),
  };

  await postTodo(newTodo);
}
