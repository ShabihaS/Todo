import type { Category } from './category'

export interface Todo {
  id: number
  task: string
  isArchived: boolean
  category: Category
}

export interface CreateTodoRequest {
  task: string
  categoryId: number
}

export interface UpdateTodoRequest {
  task: string
  categoryId: number
}