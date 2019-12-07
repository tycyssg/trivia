import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private userService:UserService) { }

  isAuthenticated = false;
  itIsAdmin = false;

  private userSub: Subscription;

  ngOnInit() {
    this.userSub = this.userService.user.subscribe(user => {
      if(user){
        if(user.role === 'ADMIN'){
          this.itIsAdmin = true;
        }
        this.isAuthenticated = true;
      }else{
        this.isAuthenticated = false;
        this.itIsAdmin = false;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout(){
    this.userService.logout();
    this.userService.logOutRequest().subscribe(response => {});
  }
}
