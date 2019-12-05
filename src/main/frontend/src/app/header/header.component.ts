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
  private userSub: Subscription;

  ngOnInit() {
    this.userSub = this.userService.user.subscribe(user => {
      this.isAuthenticated = !!user;
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
