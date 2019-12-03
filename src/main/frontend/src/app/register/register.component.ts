import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  registerForm: FormGroup;
  progressBarType:string;

  ngOnInit() {

    this.registerForm = new FormGroup({
      username: new FormControl(Validators.required),
      email: new FormControl(Validators.required,Validators.email),
      password: new FormControl(Validators.required),
      repeatPassword: new FormControl(Validators.required),
    });

  }

  register(){

  }
}
