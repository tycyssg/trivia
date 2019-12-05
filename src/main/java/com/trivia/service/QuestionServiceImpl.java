package com.trivia.service;


import com.trivia.model.Category;
import com.trivia.model.User;
import com.trivia.repository.CategoryRepository;
import com.trivia.repository.QuestionRepository;
import com.trivia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
