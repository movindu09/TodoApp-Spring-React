package com.TodoApp.Todo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TodoDto {

    private Long id;
    @NotEmpty(message = "Title is required....")
    private String title;
    @NotEmpty(message = "Description is required....")
    private String description;
    private String status;
}
