import { Injectable } from '@angular/core';
import {ListLogin} from './list-login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListLoginService {

  constructor(private http: HttpClient) { }

   cargarLogados(){
     
    return this.http.get('/api/login');
  }

  modificaLogados(){
     
    return this.http.get('/api/login');
  }

  borraLogados(usr){
     
    return this.http.delete<ListLogin>('/api/login/'+ usr.id);

  }

  updateLogados(usr){
     
    return this.http.put<ListLogin>('/api/login/'+ usr.id, usr);

  }
}
