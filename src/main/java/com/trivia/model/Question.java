package com.trivia.model;

import com.trivia.utils.Utilities.QuestionDifficulty;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;

    @OneToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "questionId")
    private List<QuestionAnswers> questionAnswers;
    private String correctAnswer;

    @Enumerated(EnumType.STRING)
    private QuestionDifficulty questionDifficulty;

    private Long categoryId;


    public Question() {
    }

    public Question(String question, List<QuestionAnswers> questionAnswers, String correctAnswer, QuestionDifficulty questionDifficulty) {
        this.question = question;
        this.questionAnswers = questionAnswers;
        this.correctAnswer = correctAnswer;
        this.questionDifficulty = questionDifficulty;
    }
}
