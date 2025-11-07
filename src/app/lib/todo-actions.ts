import { createTodo, TodoActionState, updateTodo } from "./actions";

const createTodoAction =  async (prevState: TodoActionState, formData: FormData) => {
    return await createTodo(prevState, formData);
}

const updateTodoAction = async (prevState: TodoActionState, formData: FormData) => {
    return await updateTodo(prevState, formData);
}

export {createTodoAction, updateTodoAction}