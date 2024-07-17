package com.TodoApp.Todo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SignInRequest {

    @NotEmpty(message = "Email is required....")
    private String email;
    @NotEmpty(message = "Password is required....")
    private String password;
}