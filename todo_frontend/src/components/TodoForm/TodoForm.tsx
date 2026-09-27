import { useEffect, useState } from 'react'
import type { Category } from '../../types/category'
import type { Todo } from '../../types/todo'
import { getCategories } from '../../api/categoryApi'
import { createTodo } from '../../api/todoApi'

interface TodoFormProps {
  onTodoCreated: (todo: Todo) => void
}

function TodoForm({ onTodoCreated }: TodoFormProps) {
  const [task, setTask] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch {
        setError('Failed to load categories')
      }
    }

    loadCategories()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!task.trim() || !categoryId) {
      setError('Please enter a task and select a category')
      return
    }

    try {
      const newTodo = await createTodo({
        task: task.trim(),
        categoryId: Number(categoryId),
      })

      onTodoCreated(newTodo)

      setTask('')
      setCategoryId('')
      setError('')
    } catch {
      setError('Failed to create todo')
    }
  }

  return (
    <form
      className="todo-form mb-8 rounded-lg border p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="todo-form__title mb-4 text-xl font-semibold">
        Add a new task
      </h2>

      <div className="todo-form__field mb-4">
        <label
          htmlFor="task"
          className="todo-form__label mb-1 block text-sm font-medium"
        >
          Task
        </label>

        <input
          id="task"
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Enter a task"
          className="todo-form__input w-full rounded-md border px-3 py-2"
        />
      </div>

      <div className="todo-form__field mb-4">
        <label
          htmlFor="category"
          className="todo-form__label mb-1 block text-sm font-medium"
        >
          Category
        </label>

        <select
          id="category"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="todo-form__select w-full rounded-md border px-3 py-2"
        >
          <option value="">Select a category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="todo-form__error mb-4 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="todo-form__button rounded-md border px-4 py-2 font-medium"
      >
        Add Task
      </button>
    </form>
  )
}

export default TodoForm