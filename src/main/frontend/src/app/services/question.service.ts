import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

import {Router} from "@angular/router";
import {CategoryModel} from "../models/category.model";
import {catchError, tap} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private readonly urls = {
    saveCategory: "/api/admin/saveCategory",
    getAllCategories: "/api/auth/getAllCategories",
    saveQuestion: "/api/admin/saveQuestion",
    deleteQuestion: "/api/admin/deleteQuestion",
  };

  constructor(private httpClient:HttpClient,private router:Router) { }


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

    getAllQuestions():Observable<CategoryModel[]>{
    return this.httpClient
      .get<CategoryModel[]>(this.urls.getAllCategories,)
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

}
