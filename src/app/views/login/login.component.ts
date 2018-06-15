import {Component, OnInit} from '@angular/core';
import {Login} from './login';
import {AuthService} from '../../services/login/auth.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  private login: Login = new Login();

  constructor(private authService: AuthService) {
    // Obtem o token no navegador
    this.authService.getToken();
  }

  // Inicia a tela de login fazendo a verificação de login
  ngOnInit() {

  }

  // Efetua um novo login
  public loginUser() {
    console.log('Verificando validação');
    this.authService.getAccessToken(this.login)
  }

  // Sai do sistema
  public logoutUser(){
    this.authService.logout();
  }

}
