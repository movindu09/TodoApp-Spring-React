package com.TodoApp.Todo.dto;

import lombok.Data;

@Data
public class SignInRequest {

    private String email;
    private String password;
}