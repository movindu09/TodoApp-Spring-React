package com.TodoApp.Todo.exception;

public class AuthenticationFailedException extends RuntimeException {

    public AuthenticationFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}