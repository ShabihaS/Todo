package io.nology.todos.todo;

import io.nology.todos.category.entities.Category;
import io.nology.todos.category.CategoryRepository;
import io.nology.todos.todo.dtos.CreateTodoRequest;
import io.nology.todos.todo.dtos.UpdateTodoRequest;
import io.nology.todos.todo.entities.Todo;
import org.springframework.stereotype.Service;
import io.nology.todos.common.exceptions.NotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

  private final TodoRepository todoRepository;
  private final CategoryRepository categoryRepository;

  public TodoService(
      TodoRepository todoRepository,
      CategoryRepository categoryRepository) {

    this.todoRepository = todoRepository;
    this.categoryRepository = categoryRepository;
  }

  {
    /* FindAll */}

  public List<Todo> findAll() {
    return todoRepository.findAll()
        .stream()
        .filter(todo -> !todo.isArchived())
        .toList();
  }

  public List<Todo> findByCategory(String category) {
    return todoRepository.findActiveTodosByCategory(category);
  }

  public Optional<Todo> findById(Long id) {
    return todoRepository.findById(id)
        .filter(todo -> !todo.isArchived());
  }

  {
    /* Create */}

  public Todo create(CreateTodoRequest data) {

    Category category = categoryRepository.findById(data.getCategoryId())
        .orElseThrow(() -> new NotFoundException(
            "Could not find category with id " + data.getCategoryId()));

    Todo todo = new Todo();

    todo.setTask(data.getTask());
    todo.setCategory(category);
    todo.setArchived(false);

    return todoRepository.save(todo);
  }

  {
    /* Update */}

  public Optional<Todo> updateById(Long id, UpdateTodoRequest data) {

    Optional<Todo> result = todoRepository.findById(id);

    if (result.isPresent()) {

      Todo todo = result.get();

      Category category = categoryRepository.findById(data.getCategoryId())
          .orElseThrow(() -> new NotFoundException(
              "Could not find category with id " + data.getCategoryId()));

      todo.setTask(data.getTask());
      todo.setCategory(category);

      todoRepository.save(todo);
    }

    return result;
  }

  {
    /* DeleteById */}

  public boolean deleteById(Long id) {

    Optional<Todo> result = todoRepository.findById(id);

    if (result.isPresent()) {

      Todo todo = result.get();

      todo.setArchived(true);

      todoRepository.save(todo);

      return true;
    }

    return false;
  }
}
