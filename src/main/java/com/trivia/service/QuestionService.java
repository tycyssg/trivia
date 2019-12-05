package com.trivia.service;


import com.trivia.model.Category;
import com.trivia.model.User;

import java.util.List;

public interface QuestionService {

    Category saveCategory(Category category);
    boolean exitByName(String categoryName);


}
