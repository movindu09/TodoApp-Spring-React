package com.TodoApp.Todo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    @NotEmpty(message = "First Name is required....")
    private String firstName;

    @NotEmpty(message = "Last Name is required....")
    private String lastName;

    @NotEmpty(message = "Email is required....")
    @Email
    private String email;

    @NotEmpty(message = "Password is required....")
    private String password;
}
