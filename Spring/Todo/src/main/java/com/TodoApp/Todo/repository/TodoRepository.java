package com.TodoApp.Todo.repository;

import com.TodoApp.Todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    void deleteTodoById(Long id);
}
