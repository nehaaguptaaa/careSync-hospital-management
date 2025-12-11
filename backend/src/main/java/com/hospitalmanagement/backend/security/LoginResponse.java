package com.hospitalmanagement.backend.security;

import com.hospitalmanagement.backend.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
	private String token;
	private User user;
}
