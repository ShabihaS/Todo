import { useState } from 'react'
import type { Category } from '../../types/category'
import { createCategory } from '../../api/categoryApi'

interface CategoryFormProps {
  onCategoryCreated: (category: Category) => void
}

function CategoryForm({ onCategoryCreated }: CategoryFormProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!name.trim()) {
      setError('Please enter a category name')
      return
    }

    try {
      const newCategory = await createCategory({
        name: name.trim(),
      })

      onCategoryCreated(newCategory)

      setName('')
      setError('')
    } catch {
      setError('Failed to create category')
    }
  }

  return (
    <form
      className="category-form mb-8 rounded-lg border p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="category-form__title mb-4 text-xl font-semibold">
        Add a new category
      </h2>

      <div className="category-form__field mb-4">
        <label
          htmlFor="category-name"
          className="category-form__label mb-1 block text-sm font-medium"
        >
          Category name
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter a category name"
          className="category-form__input w-full rounded-md border px-3 py-2"
        />
      </div>

      {error && (
        <p className="category-form__error mb-4 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="category-form__button rounded-md border px-4 py-2 font-medium"
      >
        Add Category
      </button>
    </form>
  )
}

export default CategoryForm