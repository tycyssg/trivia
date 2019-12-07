package com.trivia.service;


import com.trivia.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    User findByUsername(String username);

    List<User> findAllUsers();

    User findByEmail(String username);

    String currentUser();


}
