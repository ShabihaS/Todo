package io.nology.todos.category;

import io.nology.todos.category.dtos.CreateCategoryRequest;
import io.nology.todos.category.dtos.UpdateCategoryRequest;
import io.nology.todos.category.entities.Category;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

  private final CategoryRepository categoryRepository;

  public CategoryService(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public List<Category> findAll() {
    return categoryRepository.findAll();
  }

  public Category create(CreateCategoryRequest data) {
    Category category = new Category();

    category.setName(data.getName());

    return categoryRepository.save(category);
  }

  public Optional<Category> findById(Long id) {
    return categoryRepository.findById(id);
  }

  public Optional<Category> updateById(Long id, UpdateCategoryRequest data) {
    Optional<Category> result = categoryRepository.findById(id);

    if (result.isPresent()) {
      Category category = result.get();

      category.setName(data.getName());

      categoryRepository.save(category);
    }

    return result;
  }

  public boolean deleteById(Long id) {
    Optional<Category> result = categoryRepository.findById(id);

    if (result.isPresent()) {
      categoryRepository.deleteById(id);
      return true;
    }

    return false;
  }
}
