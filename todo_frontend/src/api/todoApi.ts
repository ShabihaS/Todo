import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
} from '../types/todo'

const API_URL = 'http://localhost:8080/todos'

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  return response.json()
}

export const getTodosByCategory = async (
  categoryId: number,
): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}?category=${categoryId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch todos by category')
  }

  return response.json()
}

export const createTodo = async (
  todo: CreateTodoRequest,
): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  if (!response.ok) {
    throw new Error('Failed to create todo')
  }

  return response.json()
}

export const updateTodo = async (
  id: number,
  todo: UpdateTodoRequest,
): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  if (!response.ok) {
    throw new Error('Failed to update todo')
  }

  return response.json()
}

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
}