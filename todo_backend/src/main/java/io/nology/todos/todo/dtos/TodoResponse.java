package io.nology.todos.todo.dtos;

import io.nology.todos.category.dtos.CategoryResponse;
import io.nology.todos.todo.entities.Todo;

public class TodoResponse {

  private Long id;
  private String task;
  private boolean isArchived;
  private CategoryResponse category;

  public TodoResponse(
      Long id,
      String task,
      boolean isArchived,
      CategoryResponse category) {

    this.id = id;
    this.task = task;
    this.isArchived = isArchived;
    this.category = category;
  }

  public static TodoResponse of(Todo todo) {
    return new TodoResponse(
        todo.getId(),
        todo.getTask(),
        todo.isArchived(),
        CategoryResponse.of(todo.getCategory()));
  }

  public Long getId() {
    return id;
  }

  public String getTask() {
    return task;
  }

  public boolean isArchived() {
    return isArchived;
  }

  public CategoryResponse getCategory() {
    return category;
  }
}
