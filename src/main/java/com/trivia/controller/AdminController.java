package com.trivia.controller;


import com.google.gson.Gson;
import com.trivia.model.Category;
import com.trivia.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final QuestionService questionService;

    @Autowired
    public AdminController(QuestionService questionService) {
        this.questionService = questionService;
    }


    @PostMapping("/saveCategory")
        public ResponseEntity<?> register(@RequestBody Category category){

        if(questionService.exitByName(category.getCategoryName())){
            return new ResponseEntity<>(new Gson().toJson("CATEGORY_EXIST"), HttpStatus.CONFLICT);
        }

        questionService.saveCategory(category);
        return new ResponseEntity<>(new Gson().toJson("SAVED"), HttpStatus.CREATED);
    }
}
