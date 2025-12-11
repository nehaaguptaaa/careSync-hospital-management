package com.hospitalmanagement.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.hospitalmanagement.backend.security.jwt.AuthEntryPointJwt;
import com.hospitalmanagement.backend.security.jwt.AuthTokenFilter;



@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private AuthEntryPointJwt authEntryPointJwt;
	
	@Autowired
	private AuthTokenFilter authTokenFilter;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception
	{
		httpSecurity
		.csrf(csrf->csrf.disable())
		.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowCredentials(true);
            config.addAllowedOrigin("http://localhost:3000");
            config.addAllowedHeader("*");
            config.addAllowedMethod("*");
            return config;
        }))
		
		.authorizeHttpRequests(req->req
		.requestMatchers(HttpMethod.POST, "/user/**","/auth/login").permitAll()
		.anyRequest().authenticated()
		);
		
		httpSecurity.exceptionHandling(authentication->
		             authentication.authenticationEntryPoint(authEntryPointJwt));
		
		httpSecurity.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
		
	
		return httpSecurity.build();

	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception
	{
		return authenticationConfiguration.getAuthenticationManager();
	}

}