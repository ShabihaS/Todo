package io.nology.todos.todo;

import io.nology.todos.todo.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

  @Query("""
      SELECT t FROM Todo t
      WHERE t.isArchived = false
      AND LOWER(t.category.name) = LOWER(:category)
      """)
  List<Todo> findActiveTodosByCategory(@Param("category") String category);
}
