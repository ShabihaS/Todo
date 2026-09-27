import { useEffect, useState } from 'react'
import type { Todo } from '../../types/todo'
import type { Category } from '../../types/category'
import { deleteTodo, getTodos } from '../../api/todoApi'
import TodoCard from '../../components/TodoCard/TodoCard'
import TodoForm from '../../components/TodoForm/TodoForm'
import CategoryForm from '../../components/CategoryForm/CategoryForm'
import EditTodoForm from '../../components/EditTodoForm/EditTodoForm'
import { getCategories } from '../../api/categoryApi'
import CategoryList from '../../components/CategoryList/CategoryList'

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
  const loadData = async () => {
    try {
      const [todosData, categoriesData] = await Promise.all([
        getTodos(),
        getCategories(),
      ])

      setTodos(todosData)
      setCategories(categoriesData)
    } catch {
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  loadData()
}, [])

  const handleTodoCreated = (newTodo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, newTodo])
  }

  const handleCategoryCreated = (newCategory: Category) => {
  setCategories((currentCategories) => [
    ...currentCategories,
    newCategory,
  ])
}

const handleCategoryUpdated = (updatedCategory: Category) => {
  setCategories((currentCategories) =>
    currentCategories.map((category) =>
      category.id === updatedCategory.id
        ? updatedCategory
        : category,
    ),
  )
}

const handleCategoryDeleted = (id: number) => {
  setCategories((currentCategories) =>
    currentCategories.filter((category) => category.id !== id),
  )
}

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id)

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id),
      )
    } catch {
      setError('Failed to delete todo')
    }
  }

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
  }

  const handleTodoUpdated = (updatedTodo: Todo) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    )

    setEditingTodo(null)
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading todos...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-red-700">
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className="todos-page min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="todos-page__container mx-auto max-w-5xl">
        
        {/* Page heading */}
        <header className="todos-page__header mb-8 text-center">
          <h1 className="todos-page__title text-4xl font-bold tracking-tight text-[#08060D] sm:text-5xl">
            Todos
          </h1>

          <p className="todos-page__subtitle mt-3 text-lg text-[#6B6375]">
            Manage your tasks and categories
          </p>
        </header>

       <CategoryForm onCategoryCreated={handleCategoryCreated} />

<CategoryList
  categories={categories}
  onCategoryUpdated={handleCategoryUpdated}
  onCategoryDeleted={handleCategoryDeleted}
/>

<TodoForm onTodoCreated={handleTodoCreated} />

        {/* Edit form */}
        {editingTodo && (
          <EditTodoForm
            todo={editingTodo}
            onTodoUpdated={handleTodoUpdated}
            onCancel={() => setEditingTodo(null)}
          />
        )}

        {/* Todo list */}
        <section className="todos-page__tasks mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="todos-page__tasks-title text-2xl font-bold text-[#08060D]">
              Your Tasks
            </h2>

            <span className="rounded-full bg-[#AA3BFF]/10 px-3 py-1 text-sm font-medium text-[#AA3BFF]">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {todos.length === 0 ? (
            <div className="todos-page__empty rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <p className="text-lg font-medium text-[#6B6375]">
                No tasks yet
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Add your first task using the form above.
              </p>
            </div>
          ) : (
            <div className="todos-page__list grid gap-5 sm:grid-cols-2">
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default TodosPage