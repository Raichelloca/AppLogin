import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddLoginComponent } from './add-login/add-login.component';
import { ListLoginComponent } from './login/list-login/list-login.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router'


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'listLogin', component: ListLoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddLoginComponent,
    ListLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
