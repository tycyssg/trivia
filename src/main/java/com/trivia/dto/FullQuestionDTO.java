package com.trivia.dto;

import com.trivia.utils.Utilities;
import lombok.Data;

@Data
public class FullQuestionDTO {

    private Long categoryId;
    private String questionId;
    private Utilities.QuestionDifficulty questionDifficulty;
    private String question;
    private String answer;
    private String optionOne;
    private String optionTwo;
    private String optionThree;


}
