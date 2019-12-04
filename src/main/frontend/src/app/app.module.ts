import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddComponent} from "./add/add.component";
import {MatButton, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule} from "@angular/material";
import {MatSliderModule} from "@angular/material";
import {MatMenuModule} from "@angular/material";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PlayComponent } from './play/play.component';


@NgModule({
  declarations: [
    AddComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatInputModule,
    MatSliderModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    // Add an icon to the library for convenient access in other components
    library.add(fas, far);
  }
}
