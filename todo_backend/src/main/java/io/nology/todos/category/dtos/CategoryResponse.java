package io.nology.todos.category.dtos;

import io.nology.todos.category.entities.Category;

public class CategoryResponse {

  private Long id;
  private String name;

  public CategoryResponse(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public static CategoryResponse of(Category category) {
    return new CategoryResponse(
        category.getId(),
        category.getName());
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }
}
