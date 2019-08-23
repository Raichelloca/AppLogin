import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUsr(email, password){
     
    return this.http.get('/api/login/getemailpassw?email='+email+'&password='+password);
    
  }

  newUsr(email, password){

    let login: Login;
    login = {
      email : email,
      password : password

    }
    
    return this.http.post('/api/login?email='+email+'&password='+password, login);
   
  }
}
