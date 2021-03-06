import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {CategoryModel} from "../models/category.model";
import {catchError, map, tap} from "rxjs/operators";
import {UserModel} from "../models/user.model";
import {UserService} from "./user.service";



@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private readonly urls = {
    saveCategory: "/api/admin/saveCategory",
    getAllCategories: "/api/auth/getAllCategories",
    saveQuestion: "/api/admin/saveQuestion",
    deleteQuestion: "/api/admin/deleteQuestion",
    updateUserScore: "/api/auth/updateUserScore",
    getTopThreePlayers: "/api/auth/getTopThreePlayers",
  };

  constructor(private httpClient:HttpClient,private userService:UserService) { }


  saveCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(this.urls.saveCategory, category, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    }).pipe(catchError(this.handleError));
  }

  saveQuestion(question: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(this.urls.saveQuestion, question, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    }).pipe(catchError(this.handleError));
  }

    getAllCategories():Observable<CategoryModel[]>{
    return this.httpClient
      .get<CategoryModel[]>(this.urls.getAllCategories,)
      .pipe(
        catchError(this.handleError)
      );
    }

  getTopThreePlayers():Observable<UserModel[]>{
    return this.httpClient
      .get<UserModel[]>(this.urls.getTopThreePlayers,)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error) {
      case 'CATEGORY_EXIST': errorMessage = 'The category already exist!';
        break;
      case 'NO_CATEGORY_SAVED': errorMessage = 'OOPS! There is no category saved!';
        break;
    }

    return throwError(errorMessage);
  }


  deleteQuestion(questionId:number){
    const url = `${this.urls.deleteQuestion}/${questionId}`;
    return this.httpClient.delete<string>(url);
  }

  updateUserScore(score: number): Observable<any> {
    return this.httpClient.post<any>(this.urls.updateUserScore, score, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    }).pipe(catchError(this.handleError),map(resp =>{
      //update the user score
      let memoryUser:UserModel = JSON.parse(localStorage.getItem('userData'));

      if(memoryUser){
        memoryUser.score = resp.body;
        localStorage.setItem('userData',JSON.stringify(memoryUser));
        this.userService.user.next(memoryUser);
      }
      return score;
    }));
  }
}
