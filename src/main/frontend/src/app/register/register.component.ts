import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService) { }

  registerForm: FormGroup;
  progressBarType:string;
  progressBarValue:number = 0;
  progressBarText:string = 'Completed';
  showProgressBar:boolean = false;
  showProgressBarRp:boolean = false;
  passNotMatch:boolean = true;

  ngOnInit() {

    this.registerForm = new FormGroup({
      username: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      repeatPassword: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    });
  this.checkThePasswordStrength();
  this.checkPasswordRepeat();
  }

  register(){
    const user:UserModel = new UserModel(this.registerForm.value);
    this.userService.registerUser(user).subscribe(response =>{

    })
  }
  showBar(){
    this.showProgressBar = true;
  }
  hideProgressBar(){
    this.showProgressBar = false;
  }

  checkThePasswordStrength(){
    this.registerForm.get('password').valueChanges.subscribe((val:string) =>{
      if( (val.match(/^[0-9]*$/) || val.match(/^[a-z]*$/) || val.match(/^[A-Z]*$/) ) && val.length >= 1){
        this.progressBarValue = 25;
        this.progressBarType = 'danger';
        this.progressBarText = 'Week'
      }else if(val.match(/^[a-zA-Z]*$/) && val.length > 6 ){
        this.progressBarValue = 50;
        this.progressBarType = 'warning';
        this.progressBarText = 'Medium'
      }else if(val.match(/^[a-zA-Z0-9]*$/) && val.length > 8){
        this.progressBarValue = 75;
        this.progressBarType = 'info';
        this.progressBarText = 'Strong'
      }else if(val.match(/^[a-zA-Z0-9@#$%^&*()-=]*$/) && val.length > 9){
        this.progressBarValue = 100;
        this.progressBarType = 'success';
        this.progressBarText = 'Very Strong'
      }else{
        this.progressBarValue = 0;
        this.progressBarType = '';
        this.progressBarText = ''
      }
    })
  }




  checkPasswordRepeat() {
    this.registerForm.get('repeatPassword').valueChanges.subscribe((value:string) => {
      if(value === this.registerForm.get('password').value){
        this.showProgressBarRp = true;
        this.passNotMatch = true;
      }else{
        this.showProgressBarRp = false;
        this.passNotMatch = false;
      }
    })
  }


}
