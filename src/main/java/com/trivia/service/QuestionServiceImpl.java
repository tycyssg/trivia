package com.trivia.service;


import com.google.gson.Gson;
import com.trivia.dto.FullQuestionDTO;
import com.trivia.model.Category;
import com.trivia.model.Question;
import com.trivia.model.QuestionAnswers;
import com.trivia.repository.CategoryRepository;
import com.trivia.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;


@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {


    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl(CategoryRepository categoryRepository, QuestionRepository questionRepository) {
        this.categoryRepository = categoryRepository;
        this.questionRepository = questionRepository;
    }


    @Override
    public Category saveCategory(Category category) {
       return categoryRepository.save(category);
    }

    @Override
    public boolean exitByName(String categoryName) {
        return categoryRepository.existsByCategoryName(categoryName);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public ResponseEntity<?> saveQuestion(Category category) {

        if(!categoryRepository.existsById(category.getId())){
            return new ResponseEntity<>(new Gson().toJson("NOT_FOUND"), HttpStatus.NO_CONTENT);
        }

        Category categoryFromDb = categoryRepository.getOne(category.getId());
        List<Question> questionList = categoryFromDb.getQuestions();

        questionList.addAll(category.getQuestions());
        categoryFromDb.setQuestions(questionList);

        return new ResponseEntity<>(categoryRepository.save(categoryFromDb), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteQuestion(Long questionId) {

        if(!questionRepository.existsById(questionId)){
            return new ResponseEntity<>(new Gson().toJson("NOT_FOUND"), HttpStatus.NO_CONTENT);
        }

        questionRepository.deleteById(questionId);
        return new ResponseEntity<>(new Gson().toJson("DELETED"), HttpStatus.OK);
    }


}
