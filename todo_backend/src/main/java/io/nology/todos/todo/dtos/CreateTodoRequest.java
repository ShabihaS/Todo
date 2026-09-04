package io.nology.todos.todo.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTodoRequest {

  @NotBlank(message = "Task cannot be empty")
  private String task;

  @NotNull(message = "Category is required")
  private Long categoryId;

  public String getTask() {
    return task;
  }

  public void setTask(String task) {
    this.task = task;
  }

  public Long getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
  }
}
