import type { Todo } from '../../types/todo'

interface TodoCardProps {
  todo: Todo
  onDelete: (id: number) => void
  onEdit: (todo: Todo) => void
}

function TodoCard({ todo, onDelete, onEdit }: TodoCardProps) {
  return (
    <article className="todo-card rounded-lg border p-4 shadow-sm">
      <div className="todo-card__content">
        <h2 className="todo-card__title text-lg font-semibold">
          {todo.task}
        </h2>

        <span className="todo-card__category mt-2 inline-block rounded-full px-3 py-1 text-sm">
          {todo.category.name}
        </span>
      </div>

      <div className="todo-card__actions mt-4 flex gap-2">
  <button
    type="button"
    onClick={() => onEdit(todo)}
    className="todo-card__button rounded-md border px-4 py-2 text-sm font-medium"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() => onDelete(todo.id)}
    className="todo-card__button todo-card__button--delete rounded-md border px-4 py-2 text-sm font-medium"
  >
    Delete
  </button>
</div>
    </article>
  )
}

export default TodoCard