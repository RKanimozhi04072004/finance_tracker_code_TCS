package com.finance.helloapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.finance.helloapp.entity.User;
import com.finance.helloapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

   
    public User registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

  
    public User loginUser(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null &&
                passwordEncoder.matches(password, user.getPassword())) {

            return user;
        }

        return null;
    }
}