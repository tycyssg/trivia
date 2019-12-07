package com.trivia.controller;


import com.google.gson.Gson;
import com.trivia.jwt.JwtTokenProvider;
import com.trivia.model.Category;
import com.trivia.model.Role;
import com.trivia.model.User;
import com.trivia.service.QuestionService;
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
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final QuestionService questionService;

    @Autowired
    public AuthController(QuestionService questionService) {
        this.questionService = questionService;
    }


    @GetMapping("auth/test")
    public ResponseEntity<?> login(){
        return new ResponseEntity<>(new Gson().toJson("this is a test"), HttpStatus.OK);
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<?> getAllCategories(){

        List<Category> categoryList= questionService.getAllCategories();
        if(categoryList.isEmpty()){
            return new ResponseEntity<>(new Gson().toJson("NO_CATEGORY_SAVED"), HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @PostMapping("/updateUserScore")
    public ResponseEntity<?> saveCategory(@RequestBody Integer score){

        if(score == 0){
            return new ResponseEntity<>(new Gson().toJson("NO_SCORE"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(questionService.updateUserScore(score), HttpStatus.CREATED);
    }

}
