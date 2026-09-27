import { useEffect, useState } from 'react'
import type { Category } from '../../types/category'
import type { Todo } from '../../types/todo'
import { getCategories } from '../../api/categoryApi'
import { updateTodo } from '../../api/todoApi'

interface EditTodoFormProps {
  todo: Todo
  onTodoUpdated: (todo: Todo) => void
  onCancel: () => void
}

function EditTodoForm({
  todo,
  onTodoUpdated,
  onCancel,
}: EditTodoFormProps) {
  const [task, setTask] = useState(todo.task)
  const [categoryId, setCategoryId] = useState(String(todo.category.id))
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!task.trim() || !categoryId) {
      setError('Please enter a task and select a category')
      return
    }

    try {
      const updatedTodo = await updateTodo(todo.id, {
        task: task.trim(),
        categoryId: Number(categoryId),
      })

      onTodoUpdated(updatedTodo)
      setError('')
    } catch {
      setError('Failed to update todo')
    }
  }

  return (
    <form
      className="edit-todo-form mb-8 rounded-lg border p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="edit-todo-form__title mb-4 text-xl font-semibold">
        Edit task
      </h2>

      <div className="edit-todo-form__field mb-4">
        <label
          htmlFor="edit-task"
          className="edit-todo-form__label mb-1 block text-sm font-medium"
        >
          Task
        </label>

        <input
          id="edit-task"
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="edit-todo-form__input w-full rounded-md border px-3 py-2"
        />
      </div>

      <div className="edit-todo-form__field mb-4">
        <label
          htmlFor="edit-category"
          className="edit-todo-form__label mb-1 block text-sm font-medium"
        >
          Category
        </label>

        <select
          id="edit-category"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="edit-todo-form__select w-full rounded-md border px-3 py-2"
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
        <p className="edit-todo-form__error mb-4 text-sm">
          {error}
        </p>
      )}

      <div className="edit-todo-form__actions flex gap-2">
        <button
          type="submit"
          className="edit-todo-form__button rounded-md border px-4 py-2 font-medium"
        >
          Update
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="edit-todo-form__button edit-todo-form__button--cancel rounded-md border px-4 py-2 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditTodoForm