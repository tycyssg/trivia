package com.trivia.model;

import com.trivia.utils.Utilities.QuestionDificulty;
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
    private QuestionDificulty questionDificulty;

    private Long categoryId;


}
