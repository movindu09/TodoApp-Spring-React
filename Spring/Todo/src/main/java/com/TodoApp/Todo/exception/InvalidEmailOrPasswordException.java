package com.TodoApp.Todo.exception;

public class InvalidEmailOrPasswordException extends RuntimeException {
    public InvalidEmailOrPasswordException(String message) {
        super(message);
    }

    public InvalidEmailOrPasswordException(String message, Throwable cause) {
        super(message, cause);
    }
}
