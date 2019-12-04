import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Role} from "../models/role.enum";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  private readonly urls = {
    register: "/api/registration",
    logout: "/api/logout",
    login: "/api/login",
  };

  constructor(private httpClient:HttpClient,private router:Router) { }

  registerUser(user: UserModel): Observable<string> {
    return this.httpClient.post<string>(this.urls.register, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    }).pipe(catchError(this.handleError));
  }


  login(user:UserModel) {
  console.log(user);
    const headers = new HttpHeaders(user ? {
      authorization:'Basic ' + btoa(user.username + ':' + user.password)
    }:{});

    return this.httpClient
      .get<UserModel>(this.urls.login,{headers:headers})
      .pipe(
        catchError(this.handleError),
        tap((resData:UserModel) => {
          this.handleAuthentication(resData);
        })
      );
  }

  autoLogin() {
    const userData:UserModel = new UserModel(JSON.parse(localStorage.getItem('userData')));

    if (!userData) {
      return;
    }

    if (userData.token) {
      this.user.next(userData);
      const expirationDuration = userData.tokenExpirationDate - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  logOutRequest(): Observable<any> {
    return this.httpClient.post(this.urls.logout, {}).pipe(
      map(response => {
        this.logout();
      })
    );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  private handleAuthentication(resData:UserModel) {
    console.log(resData);
    const expirationDate:number = new Date().getTime() + resData.tokenExpirationDate;
    const tokenExpire = resData.tokenExpirationDate;
    resData.tokenExpirationDate = expirationDate;

    this.user.next(resData);
    this.autoLogout(tokenExpire);
    localStorage.setItem('userData', JSON.stringify(resData));
  }


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
