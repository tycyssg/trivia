import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../services/question.service";
import {CategoryModel} from "../models/category.model";
import {QuestionsModel} from "../models/questions.model";
import {map} from "rxjs/operators";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit,OnDestroy {

  categoryList:CategoryModel[] = [];
  currentPlayingQuestions:QuestionsModel[] = [];

  contentLoading = false;
  emptyCategories:string = null;

  test:string[] = [];

  selectedQuestionIndex:number = 0;
  selectedQuestion:QuestionsModel;

  questionExpirationTimer:Subscription;
  expirationTime:number = 15;

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
    this.loadingAllContent();

  }


  doShuffle(){

    let currentIndex = this.selectedQuestion.questionAnswers.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.selectedQuestion.questionAnswers[currentIndex];
      this.selectedQuestion.questionAnswers[currentIndex] = this.selectedQuestion.questionAnswers[randomIndex];
      this.selectedQuestion.questionAnswers[randomIndex] = temporaryValue;
    }

    return this.selectedQuestion.questionAnswers;
  }
  loadingAllContent(){
    this.contentLoading = true;
    this.questionService.getAllCategories().subscribe(categories =>{
      this.categoryList = categories;
      this.contentLoading = false;
    },error1 => {
      this.emptyCategories = error1;
      this.contentLoading = false;
    });

  }

  selectCategory(cat:CategoryModel){
    this.currentPlayingQuestions = cat.questions;
    this.selectedQuestion = this.currentPlayingQuestions[this.selectedQuestionIndex];
    this.selectedQuestion.questionAnswers = this.doShuffle();
    this.answerTimer();
  }

  onAnswer(answerValue: string) {
      if(this.selectedQuestion.correctAnswer === answerValue){
        //request to the db to update the user score
        this.switchTheQuestion();
      }else{
        this.switchTheQuestion();
      }
  }

  switchTheQuestion(){
    if(this.selectedQuestionIndex == (this.currentPlayingQuestions.length-1)){
      this.selectedQuestionIndex = 0;
    }else{
      this.selectedQuestionIndex++;
    }
  }

  answerTimer(){
    this.questionExpirationTimer = interval(1000).subscribe(x => {
      if(this.expirationTime == 0){
        this.questionExpirationTimer.unsubscribe();
      }
      this.expirationTime--
    });
  }

  ngOnDestroy(): void {
    this.questionExpirationTimer.unsubscribe();
  }

}
