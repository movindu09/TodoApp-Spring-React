package com.TodoApp.Todo.controller;

import com.TodoApp.Todo.dto.JWTAuthResponse;
import com.TodoApp.Todo.dto.SignInRequest;
import com.TodoApp.Todo.dto.SignUpRequest;
import com.TodoApp.Todo.entity.User;
import com.TodoApp.Todo.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody  SignUpRequest signUpRequest){
        return new ResponseEntity<>(authenticationService.signUp(signUpRequest), HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<JWTAuthResponse> signin(@RequestBody SignInRequest signInRequest  ){
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }
}


