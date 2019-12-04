import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {UserService} from "./user.service";
import {UserModel} from "../models/user.model";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  private currentUser:UserModel;

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.userService.user.pipe(
      take(1),
      map(user => {
        this.currentUser = user;
        const isAuth = !!user;
        if (isAuth) {
            if(route.data.roles && route.data.roles.indexOf(this.currentUser.role) === -1){
              this.router.navigate(['/401']);
            }
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    );
  }
}
