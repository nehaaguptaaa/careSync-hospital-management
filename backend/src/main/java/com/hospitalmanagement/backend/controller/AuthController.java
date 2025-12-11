package com.hospitalmanagement.backend.controller;

import com.hospitalmanagement.backend.entity.User;
import com.hospitalmanagement.backend.security.LoginRequest;
import com.hospitalmanagement.backend.security.LoginResponse;
import com.hospitalmanagement.backend.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = null;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get authenticated user object
        User user = (User) authentication.getPrincipal();

        // Create JWT token
        String token = jwtUtils.generateTokenFromUsername(user);

        // Prepare response
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUser(user);

        return ResponseEntity.ok(response);
    }
}
