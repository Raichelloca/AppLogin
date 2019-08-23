import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from './login';
import { FormGroup, FormControl, Validators , FormBuilder} from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Campos del formulario
  emailLogin: String;
  passwordLogin: String;

  //Variables para mensajes de aviso/error
  estaLogado: boolean = false;
  noEstaLogado: boolean = false;
  altaCorrecta: boolean = false;
  existeUsr: boolean = false;
  errorLoginNull: boolean = false;
  errorPasswordNull: boolean = false;
  errorLoginFormat: boolean = false;

  //Objeto del usuario a logarse o darse de alta
  usuario: Login;
  user: FormGroup;


  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) { 

      this.user = formBuilder.group({
        'emailLogin': new FormControl('email@email.com', [Validators.required, Validators.email]),
        'passwordLogin': new FormControl('Password', Validators.required),
      });

    }  


  ngOnInit() {
    
    this.estaLogado = false;
    this.noEstaLogado = false;
    this.altaCorrecta = false;
    this.existeUsr = false;
    this.errorLoginNull = false;
    this.errorPasswordNull = false;
    this.errorLoginFormat = false;

  }

  loginUsr(){

    //Comprobamos si existe el usuario a logarse en nuestra base de datos
    this.loginService.loginUsr(this.user.value.emailLogin, this.user.value.passwordLogin)
    .subscribe(
      (data) => { // Success

        this.usuario  = data as Login;
        if (this.usuario[0] !== undefined){
          
          //En caso que sea correcto el usuario que se ha logado redirigiremos a la sesion de dicho usr
          this.router.navigate(['/listLogin', {usuario: JSON.stringify(this.usuario[0])}]);
          
          this.estaLogado = true;
          this.noEstaLogado = false;

        }else{
          this.noEstaLogado = true;
          this.estaLogado = false;

          //Quitamos el mensaje de aviso de que no esta correctamente logado pasados 5 segundos
          setTimeout(() => { 
            this.noEstaLogado = false; 
          }, 5000);
        }
      },
      (error) => {
        this.noEstaLogado = true;
        this.estaLogado = false;
      }
    );
  }

  /**
   * Metodo que da de alta un nuevo usr en nuestra BD
   * En caso que ya exista un 
   * 
   */
  newUsr(formulario){

    //Controlamos que el estaod del formulario no sea invalido
    if (formulario.status != "INVALID"){
      this.loginService.newUsr(formulario.value.emailLogin, formulario.value.passwordLogin)
      .subscribe(
        (data) => { // Success

          this.usuario  = data[0];
          this.altaCorrecta = true;
          this.existeUsr = false;

          //Quitamos el mensaje de alta correcta pasados 5 segundos
          setTimeout(() => { 
            this.altaCorrecta = false; 
          }, 5000);

          //Reseteamos los campos del login
          this.emailLogin = "";
          this.passwordLogin = "";
          
        },
        (error) => {
          this.altaCorrecta = false;
          this.existeUsr = true;

          //Quitamos el mensaje de existencia de usr pasados 5 segundos
          setTimeout(() => { 
            this.existeUsr = false; 
          }, 5000);
        }
      );
    }

  }

}
