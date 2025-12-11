package com.hospitalmanagement.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospitalmanagement.backend.entity.AppRole;
import com.hospitalmanagement.backend.entity.Role;

public interface RoleRepositary extends JpaRepository<Role, Integer>{
	Optional<Role> findByRoleName(AppRole roleName);

}

