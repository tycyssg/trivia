import {Component, OnInit} from '@angular/core';
import {CategoryModel} from "../models/category.model";
import {QuestionService} from "../services/question.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {QuestionsModel} from "../models/questions.model";
import {QuestionsAnswerModel} from "../models/questionsAnswer.model";
import {QuestionFormModel} from "../models/questionForm.model";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  categoryList:CategoryModel[] = [];
  categoryForm:FormGroup;
  questionForm:FormGroup;

  categoryError:string = null;
  categorySuccess:string = null;
  questionError:string = null;
  questionSuccess:string = null;

  contentLoading = false;

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null,[Validators.required,Validators.minLength(3)])
    });

    this.questionForm = new FormGroup({
      categoryId: new FormControl(-1,Validators.required),
      questionId: new FormControl(null),
      questionDifficulty: new FormControl("EASY",Validators.required),
      question: new FormControl(null,Validators.required),
      answer: new FormControl(null,Validators.required),
      optionOne: new FormControl(null,Validators.required),
      optionTwo: new FormControl(null,Validators.required),
      optionThree: new FormControl(null,Validators.required),
    });

    this.loadingAllContent();

  }

  saveCategory(){

    this.questionService.saveCategory(this.categoryForm.value).pipe(map(cat =>{
      this.categoryList.push(cat);
    })).subscribe(response =>{
      this.categoryForm.reset();
     this.categorySuccess = "Category Successfully Saved!"
    },error1 => this.categoryError = error1);

    this.setActionsToOff();


  }


  loadingAllContent(){
    this.contentLoading = true;
    this.questionService.getAllCategories().subscribe(categories =>{
      this.categoryList = categories;
      this.contentLoading = false;
    });
  }
  saveQuestion(){

    const questionForm:QuestionFormModel = new QuestionFormModel(this.questionForm.value);

     let categoryModel:CategoryModel = new CategoryModel();
     let questionModel:QuestionsModel = new QuestionsModel();
     let questionsAnswer1:QuestionsAnswerModel = new QuestionsAnswerModel();
     let questionsAnswer2:QuestionsAnswerModel = new QuestionsAnswerModel();
     let questionsAnswer3:QuestionsAnswerModel = new QuestionsAnswerModel();
     let questionsAnswer4:QuestionsAnswerModel = new QuestionsAnswerModel();

     categoryModel.id = questionForm.categoryId;

     questionModel.id = questionForm.questionId;
     questionModel.questionDifficulty = questionForm.questionDifficulty;
     questionModel.question = questionForm.question;
     questionModel.correctAnswer = questionForm.answer;

      questionsAnswer1.answerValue = questionForm.answer;
      questionsAnswer2.answerValue = questionForm.optionOne;
      questionsAnswer3.answerValue = questionForm.optionTwo;
      questionsAnswer4.answerValue = questionForm.optionThree;

    questionModel.questionAnswers = [questionsAnswer1, questionsAnswer2, questionsAnswer3, questionsAnswer4,];

    categoryModel.questions = [questionModel];

      this.questionService.saveQuestion(categoryModel).pipe(map(cat =>{
        const catIndex = this.categoryList.indexOf(this.categoryList.find(category => category.id === cat.id));
        this.categoryList[catIndex] = cat;
      })).subscribe(resp =>{
        this.questionForm.reset();
        this.questionSuccess = "Question Successfully saved!"
      },error1 => this.questionError = error1);

    this.setActionsToOff();

  }


  setActionsToOff() {
    setTimeout(() => {
      this.categorySuccess = null;
      this.categoryError = null;
      this.questionError= null;
      this.questionSuccess = null;
    }, 2500);
  }

  onDeleteQuestion(category:CategoryModel,questions:QuestionsModel[],questionId:number){

    this.questionService.deleteQuestion(questionId).subscribe(resp =>{
      const indexOfCat = this.categoryList.indexOf(category);
      this.categoryList[indexOfCat].questions = questions.splice(questions.indexOf(questions.find(q => q.id === questionId)),1);

      this.questionSuccess = "Question Successfully deleted!"
    },error1 => this.questionError = error1);

    this.setActionsToOff();
  }

}
