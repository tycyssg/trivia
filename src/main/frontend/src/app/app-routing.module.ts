import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {PlayComponent} from "./play/play.component";
import {AuthGuard} from "./services/auth.guard";
import {Role} from "./models/role.enum";

import {AddComponent} from "./add/add.component";

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'register', component: RegisterComponent},

  {path:'play', component: PlayComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER, Role.ADMIN]}},

  {path:'401', component: UnauthorizedComponent},
  {path:'404', component: NotFoundComponent},
  {path:'add', component: AddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
