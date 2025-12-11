package com.hospitalmanagement.backend.service;

import com.hospitalmanagement.backend.entity.AppRole;
import com.hospitalmanagement.backend.entity.Role;
import com.hospitalmanagement.backend.entity.User;
import com.hospitalmanagement.backend.repository.RoleRepositary;
import com.hospitalmanagement.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired private PasswordEncoder passwordEncoder;
    
    @Autowired private RoleRepositary roleRepositary;

    @Override
    public User saveUser(User user) {
    	user.setPassword(this.passwordEncoder.encode(user.getPassword()));
    	Role role = roleRepositary.findByRoleName(AppRole.ROLE_USER).orElseThrow(()->new RuntimeException("Role Not Found"));
    	user.setRole(role);
        return userRepository.save(user);
    }



}
