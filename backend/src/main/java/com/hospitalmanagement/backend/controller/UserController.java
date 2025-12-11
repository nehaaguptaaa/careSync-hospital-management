package com.hospitalmanagement.backend.controller;

import com.hospitalmanagement.backend.entity.User;
import com.hospitalmanagement.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // CREATE — Register User
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User saved = userService.saveUser(user);
        return ResponseEntity.ok(saved);
    }

}
