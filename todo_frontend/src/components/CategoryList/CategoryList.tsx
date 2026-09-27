import { useState } from 'react'
import type { Category } from '../../types/category'
import { deleteCategory, updateCategory } from '../../api/categoryApi'

interface CategoryListProps {
  categories: Category[]
  onCategoryUpdated: (category: Category) => void
  onCategoryDeleted: (id: number) => void
}

function CategoryList({
  categories,
  onCategoryUpdated,
  onCategoryDeleted,
}: CategoryListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [error, setError] = useState('')

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setEditName(category.name)
    setError('')
  }

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) {
      setError('Category name cannot be empty')
      return
    }

    try {
      const updatedCategory = await updateCategory(id, {
        name: editName.trim(),
      })

      onCategoryUpdated(updatedCategory)
      setEditingId(null)
      setEditName('')
      setError('')
    } catch {
      setError('Failed to update category')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id)
      onCategoryDeleted(id)
    } catch {
      setError('Failed to delete category')
    }
  }

  return (
    <section className="category-list mb-8">
      <h2 className="category-list__title mb-4 text-2xl font-bold">
        Categories
      </h2>

      {categories.length === 0 ? (
        <p className="category-list__empty text-gray-500">
          No categories found.
        </p>
      ) : (
        <div className="category-list__items grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-list__item flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
            >
              {editingId === category.id ? (
                <div className="category-list__edit flex w-full gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    className="category-list__input min-w-0 flex-1 rounded-md border px-3 py-2"
                  />

                  <button
                    type="button"
                    onClick={() => handleUpdate(category.id)}
                    className="category-list__button rounded-md bg-[#AA3BFF] px-4 py-2 font-medium text-white"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="category-list__button rounded-md border px-4 py-2 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="category-list__name font-medium">
                    {category.name}
                  </span>

                  <div className="category-list__actions flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="category-list__button rounded-md border px-3 py-2 text-sm font-medium"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      className="category-list__button category-list__button--delete rounded-md border px-3 py-2 text-sm font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="category-list__error mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </section>
  )
}

export default CategoryList