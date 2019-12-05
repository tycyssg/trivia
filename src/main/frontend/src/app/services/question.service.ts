import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private readonly urls = {
    register: "/api/admin/saveCategory",
  };

  constructor(private httpClient:HttpClient,private router:Router) { }

  // registerUser(user: UserModel): Observable<string> {
  //   return this.httpClient.post<string>(this.urls.register, user, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json;charset=utf-8",
  //       Accept: "application/json",
  //       responseType: "json",
  //     }),
  //   }).pipe(catchError(this.handleError));
  // }




  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error) {
      case 'USERNAME_EXIST': errorMessage = 'The username already exist!';
        break;
      case 'EMAIL_EXIST': errorMessage = 'The email already exist!';
        break;
      case 'USER_NOT_FOUND':
        errorMessage = 'This user does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }

    return throwError(errorMessage);
  }


}
