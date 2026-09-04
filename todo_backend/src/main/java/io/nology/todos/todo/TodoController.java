package io.nology.todos.todo;

import io.nology.todos.common.exceptions.NotFoundException;
import io.nology.todos.todo.dtos.CreateTodoRequest;
import io.nology.todos.todo.dtos.TodoResponse;
import io.nology.todos.todo.dtos.UpdateTodoRequest;
import io.nology.todos.todo.entities.Todo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

  private final TodoService todoService;

  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  @GetMapping()
  public ResponseEntity<List<TodoResponse>> findAllTodos(
      @RequestParam(required = false) String category) {

    List<Todo> allTodos;

    if (category != null && !category.isBlank()) {
      allTodos = this.todoService.findByCategory(category);
    } else {
      allTodos = this.todoService.findAll();
    }

    return ResponseEntity.ok(
        allTodos.stream()
            .map(TodoResponse::of)
            .toList());
  }

  @PostMapping()
  public ResponseEntity<TodoResponse> createTodo(
      @RequestBody @Valid CreateTodoRequest data) {

    Todo createdTodo = this.todoService.create(data);

    return new ResponseEntity<>(
        TodoResponse.of(createdTodo),
        HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<TodoResponse> getTodoById(
      @PathVariable Long id) {

    Todo result = this.todoService.findById(id)
        .orElseThrow(() -> new NotFoundException(
            "Could not find todo with id " + id));

    return ResponseEntity.ok(TodoResponse.of(result));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<TodoResponse> updateTodoById(
      @PathVariable Long id,
      @Valid @RequestBody UpdateTodoRequest data) {

    Todo result = this.todoService.updateById(id, data)
        .orElseThrow(() -> new NotFoundException(
            "Could not find todo with id " + id));

    return ResponseEntity.ok(TodoResponse.of(result));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTodoById(
      @PathVariable Long id) {

    boolean isDeleted = this.todoService.deleteById(id);

    if (isDeleted) {
      return ResponseEntity.noContent().build();
    }

    throw new NotFoundException(
        "Could not find todo with id " + id);
  }
}
