package com.finance.helloapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.helloapp.dto.LoginResponse;
import com.finance.helloapp.entity.User;
import com.finance.helloapp.security.JwtUtil;
import com.finance.helloapp.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/test")
    public String test() {
        return "Finance Tracker API is Working!";
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }


    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {

    System.out.println("Email: " + user.getEmail());
    System.out.println("Password: " + user.getPassword());

    User loginUser = userService.loginUser(
            user.getEmail(),
            user.getPassword());

    System.out.println("Login User: " + loginUser);

    if (loginUser != null) {

        String token = jwtUtil.generateToken(loginUser.getEmail());

        LoginResponse response = new LoginResponse(
                token,
                loginUser.getId(),
                loginUser.getName(),
                loginUser.getEmail());

        return ResponseEntity.ok(response);
    }

    return ResponseEntity.badRequest().body("Invalid Email or Password");
}
}