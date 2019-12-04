package com.trivia.controller;


import com.google.gson.Gson;
import com.trivia.jwt.JwtTokenProvider;
import com.trivia.model.Role;
import com.trivia.model.User;
import com.trivia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/user")
public class UserController {


    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    @Value("${app.jwt.expiration-in-ms}")
    private Long jwtExpirationInMs;

    @Autowired
    public UserController(JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<?> register(@RequestBody User user){
        if(userService.findByUsername(user.getUsername()) != null){
            return new ResponseEntity<>(new Gson().toJson("USERNAME_EXIST"),HttpStatus.CONFLICT);
        }
        if(userService.findByEmail(user.getEmail()) != null){
            return new ResponseEntity<>(new Gson().toJson("EMAIL_EXIST"),HttpStatus.CONFLICT);
        }
        user.setRole(Role.USER);
        user.setScore(0L);
        userService.saveUser(user);
        return new ResponseEntity<>(new Gson().toJson("REGISTERED"), HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(Principal principal){

        if(principal == null){
            //This should be ok http status because this will be used for logout path.
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
        User user = userService.findByUsername(authenticationToken.getName());
        user.setToken(jwtTokenProvider.generateToken(authenticationToken));
        user.setTokenExpirationDate(jwtExpirationInMs);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

//    @PostMapping("/logout")
//    public  ResponseEntity<?> logoutPage (HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null){
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//            return new ResponseEntity<>(new Gson().toJson("SUCCESS"), HttpStatus.OK);
//        }
//        return new ResponseEntity<>(new Gson().toJson("ERROR"), HttpStatus.BAD_REQUEST);
//    }


}
