import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urls = {
    register: "/api/registration",
  };

  constructor(private httpClient:HttpClient) { }

  registerUser(user: UserModel): Observable<string> {
    return this.httpClient.post<string>(this.urls.register, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json;charset=utf-8",
        Accept: "application/json",
        responseType: "json",
      }),
    });
  }
}
