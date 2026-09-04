package io.nology.todos.category;

import io.nology.todos.category.dtos.CategoryResponse;
import io.nology.todos.category.dtos.CreateCategoryRequest;
import io.nology.todos.category.dtos.UpdateCategoryRequest;
import io.nology.todos.category.entities.Category;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

import io.nology.todos.common.exceptions.NotFoundException;

@RestController
@RequestMapping("/categories")
public class CategoryController {

  private final CategoryService categoryService;

  public CategoryController(CategoryService categoryService) {
    this.categoryService = categoryService;
  }

  @GetMapping()
  public ResponseEntity<List<CategoryResponse>> findAllCategories() {
    List<Category> allCategories = this.categoryService.findAll();

    return ResponseEntity.ok(
        allCategories.stream()
            .map(CategoryResponse::of)
            .toList());
  }

  @PostMapping()
  public ResponseEntity<CategoryResponse> createCategory(
      @RequestBody @Valid CreateCategoryRequest data) {

    Category createdCategory = this.categoryService.create(data);

    return new ResponseEntity<>(
        CategoryResponse.of(createdCategory),
        HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<CategoryResponse> getCategoryById(
      @PathVariable Long id) {

    Category result = this.categoryService.findById(id)
        .orElseThrow(() -> new NotFoundException("Could not find category with id " + id));

    return ResponseEntity.ok(CategoryResponse.of(result));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<CategoryResponse> updateCategoryById(
      @PathVariable Long id,
      @Valid @RequestBody UpdateCategoryRequest data) {

    Category result = this.categoryService.updateById(id, data)
        .orElseThrow(() -> new NotFoundException("Could not find category with id " + id));
    return ResponseEntity.ok(CategoryResponse.of(result));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategoryById(
      @PathVariable Long id) {

    boolean isDeleted = this.categoryService.deleteById(id);

    if (isDeleted) {
      return ResponseEntity.noContent().build();
    }

    throw new NotFoundException(
        "Could not find category with id " + id);
  }
}