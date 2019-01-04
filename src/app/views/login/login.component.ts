import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { AuthService } from '../../services/login/auth.service';
import { VarGlobal } from 'app/services/var-global';

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

  ngOnInit() {

  }

  // Efetua um novo login
  public loginUser() {
    this.authService.getAccessToken(this.login);
  }

  // Sai do sistema
  public logoutUser() {
    this.authService.logout();
  }

}
