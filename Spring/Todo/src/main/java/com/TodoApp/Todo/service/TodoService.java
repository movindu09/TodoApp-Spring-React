package com.TodoApp.Todo.service;

import com.TodoApp.Todo.dto.TodoDto;
import com.TodoApp.Todo.model.Todo;

import java.util.List;
import java.util.Optional;


public interface TodoService {

    TodoDto createTodo(TodoDto todoDto);

    List<Todo> getAllTodos();

    Optional<Todo> getTodoById(Long id);

    Todo updateTodo(Todo todo);

    void deleteTodoById(Long id);

}
