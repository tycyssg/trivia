package com.trivia.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "ANSWERS_FOR_QUESTIONS")
public class QuestionAnswers implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String answerValue;
    private Long questionId;

    public QuestionAnswers() {
    }

    public QuestionAnswers(String answerValue) {
        this.answerValue = answerValue;
    }
}
