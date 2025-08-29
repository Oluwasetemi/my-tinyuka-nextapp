import { NewTodo, Todo } from "@/types/database";

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

  const newTodo: NewTodo = {
    title,
    completed,
    created_at: new Date(),
  };

  await postTodo(newTodo as Todo);
}
