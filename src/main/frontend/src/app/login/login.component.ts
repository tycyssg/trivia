import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private router: Router,private userService:UserService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    });
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;




  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.isLoading = true;

    this.userService.login(new UserModel(this.loginForm.value)).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/play']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.loginForm.reset();
  }
}
