package com.trivia.service;



import com.trivia.model.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface QuestionService {

    Category saveCategory(Category category);
    boolean exitByName(String categoryName);
    List<Category> getAllCategories();
    ResponseEntity<?> saveQuestion(Category category);
    ResponseEntity<String> deleteQuestion(Long questionId);
    ResponseEntity<?> updateUserScore(Integer score);
}
