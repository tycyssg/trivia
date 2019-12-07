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
        public ResponseEntity<?> saveCategory(@RequestBody Category category){

        if(questionService.exitByName(category.getCategoryName())){
            return new ResponseEntity<>(new Gson().toJson("CATEGORY_EXIST"), HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(questionService.saveCategory(category), HttpStatus.CREATED);
    }


    @PostMapping("/saveQuestion")
    public ResponseEntity<?> saveQuestion(@RequestBody Category category){
        return questionService.saveQuestion(category);
    }

    @ResponseBody
    @DeleteMapping(value = "/deleteQuestion/{questionId}", produces = "application/json")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        if (questionId == null)
            return new ResponseEntity<>(new Gson().toJson(new Gson().toJson("Id is not present")), HttpStatus.BAD_REQUEST);

        return questionService.deleteQuestion(questionId);
    }




}
