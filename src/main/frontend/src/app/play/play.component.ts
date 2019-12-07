import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../services/question.service";
import {CategoryModel} from "../models/category.model";
import {QuestionsModel} from "../models/questions.model";
import {interval, Subscription} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit,OnDestroy {

  questionExpirationTimer:Subscription;
  subsUser:Subscription;

  categoryList:CategoryModel[] = [];
  currentPlayingQuestions:QuestionsModel[] = [];

  contentLoading = false;
  emptyCategories:string = null;

  test:string[] = [];

  selectedQuestionIndex:number = 0;
  selectedQuestion:QuestionsModel;


  expirationTime:number = 15;

  private easyScore:number = 10;
  private mediumScore:number = 20;
  private hardScore:number = 30;

  pointsReceived:number = 0;
  showScoreAlert:boolean = false;
  currentScore:number = 0;

  constructor(private questionService:QuestionService,private userService:UserService) { }

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

    this.subsUser = this.userService.user.subscribe(user =>{
      this.currentScore = user.score;
    })

  }


  selectCategory(cat:CategoryModel){
    this.resetTheTimer();
    this.selectedQuestionIndex = 0;

    this.currentPlayingQuestions = cat.questions;
    this.selectedQuestion = this.currentPlayingQuestions[this.selectedQuestionIndex];
    this.selectedQuestion.questionAnswers = this.doShuffle();
    this.answerTimer();
  }


  onAnswer(answerValue: string) {
      if(this.selectedQuestion.correctAnswer === answerValue){

        //request to the db to update the user score
        switch (this.selectedQuestion.questionDifficulty) {
          case 'EASY': this.updateScore(this.easyScore);
          break;
          case 'MEDIUM': this.updateScore(this.mediumScore);
          break;
          case 'HARD': this.updateScore(this.hardScore);
          break;
        }

        this.switchTheQuestion();
      }else{
        this.switchTheQuestion();
      }
  }

  switchTheQuestion(){
      this.resetTheTimer();

    if(this.selectedQuestionIndex == (this.currentPlayingQuestions.length-1)){
      this.selectedQuestionIndex = 0;
      this.selectedQuestion = this.currentPlayingQuestions[this.selectedQuestionIndex];
      this.answerTimer();
    }else{
      this.selectedQuestionIndex++;
      this.selectedQuestion = this.currentPlayingQuestions[this.selectedQuestionIndex];
      this.answerTimer();
    }
  }

  resetTheTimer(){
    this.expirationTime = 15;
    if(this.questionExpirationTimer)
      this.questionExpirationTimer.unsubscribe();
  }

  answerTimer(){
    this.questionExpirationTimer = interval(1000).subscribe(x => {
      this.expirationTime--;
      if(this.expirationTime == 0){
        this.switchTheQuestion();
      }
    });
  }

  updateScore(score:number){
    this.questionService.updateUserScore(score).subscribe(response =>{
      this.pointsReceived = score;
      this.showScoreAlert = true;
    });

    this.setActionsToOff();
  }

  setActionsToOff() {
    setTimeout(() => {
      this.pointsReceived = 0;
      this.showScoreAlert = false;
    }, 2500);
  }

  ngOnDestroy(): void {
    this.resetTheTimer();
    this.subsUser.unsubscribe();
  }

}
