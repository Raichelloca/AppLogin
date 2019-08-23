import { Component, OnInit } from '@angular/core';
import {ListLoginService} from './list-login.service';
import {ListLogin} from './list-login';
import { ActivatedRoute } from '@angular/router'
import { Login } from '../login';

@Component({
  selector: 'app-list-login',
  templateUrl: './list-login.component.html',
  styleUrls: ['./list-login.component.sass']
})
export class ListLoginComponent implements OnInit {

  constructor(
    private listLoginService: ListLoginService,
    private route: ActivatedRoute ) {}

  public usrLogados: ListLogin[];
  public borradoCorrectamente:boolean = false;
  public updateCorrectamente:boolean = false;
  public usuarioActual: Login;

  ngOnInit() {

    // Cargamos los usuarios logados
    this.cargarLogados();
    this.borradoCorrectamente = false;
    this.updateCorrectamente = false;

    this.usuarioActual = JSON.parse(this.route.snapshot.params.usuario);

  }

  public cargarLogados() {

    this.listLoginService.cargarLogados()
    .subscribe(
      (data) => { // Success
        this.usrLogados = data as ListLogin[];

      },
      (error) => {
        console.error(error);
      }
    );
  }

  borrarUsr(usr){
    this.listLoginService.borraLogados(usr)
    .subscribe(
      (data) => { // Success
        this.borradoCorrectamente = true;
       
        //Borramos los mensajes de aviso y recargamos la pagina
        this.borrarMns();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateUsr(usr){
    this.listLoginService.updateLogados(usr)
    .subscribe(
      (data) => { // Success
        this.updateCorrectamente = true;

        //Borramos los mensajes de aviso y recargamos la pagina
        this.borrarMns();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  borrarMns(){
    //Quitamos los mensajes de aviso pasados 5 segundos
    setTimeout(() => { 
      this.borradoCorrectamente = false; 
      this.updateCorrectamente = false; 

     }, 5000);

     //Una vez que tenemos borrado correctamente al usr recargamos la pantalla con los usr que quedan
     this.cargarLogados();
  }

}
