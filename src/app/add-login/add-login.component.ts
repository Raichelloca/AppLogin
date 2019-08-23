import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { AddLogin } from './add-login.model'

@Component({
  selector: 'app-add-login',
  templateUrl: './add-login.component.html',
  styleUrls: ['./add-login.component.sass']
})
export class AddLoginComponent implements OnInit {

  emailAlta: String;
  passwordAlta: String;
  constructor() { }

  ngOnInit() {
    this.emailAlta = "newEmail@gmail.com";
    this.passwordAlta = "Enter password";
  }
  
  grabarUsr(){
    this.emailAlta = "newEmail@gmail.com";
    this.passwordAlta = "Enter password";
  }

}
