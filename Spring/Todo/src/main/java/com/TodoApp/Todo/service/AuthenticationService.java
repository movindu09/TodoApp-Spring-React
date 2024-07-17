package com.TodoApp.Todo.service;

import com.TodoApp.Todo.dto.JWTAuthResponse;
import com.TodoApp.Todo.dto.RefreshTokenRequest;
import com.TodoApp.Todo.dto.SignInRequest;
import com.TodoApp.Todo.dto.SignUpRequest;
import com.TodoApp.Todo.entity.User;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);

    JWTAuthResponse signIn(SignInRequest signInRequest);

    JWTAuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}