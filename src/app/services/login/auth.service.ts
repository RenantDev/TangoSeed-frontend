import {Injectable} from '@angular/core';
import {Login} from '../../views/login/login';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isBoolean} from "util";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private access_token = null;
  private refresh_token = null;
  private status_login: boolean = false;
  private baseUrl = 'http://api.tangoseed/';
  private oauthUrl = this.baseUrl + 'oauth/token';

  public getAccessToken(login: Login) {

    // header da autenticação
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // corpo da autenticação
    const postData = {
      username: login.username,
      password: login.password,
      client_id: 2,
      client_secret: 'fBzFnCshSZry8XBgKSaDz4qZpSxjBb4GBaYw4vq8',
      grant_type: 'password',
      scope: ''
    };

    // Obtem o token com as informações obtidas

    this.http.post(this.oauthUrl, postData, {headers})
      .subscribe(
        res => {
          if (login.save) {
            this.refresh_token = res['refresh_token'].toString();
            localStorage.setItem('refresh_token', this.refresh_token);
          }
          this.access_token = res['access_token'].toString();
          localStorage.setItem('token', this.access_token);

          this.check();

        },
        err => {
          console.log("Error occured");
        }
      );
  }

  public logout() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get(this.baseUrl + 'api/logout', {headers})
      .subscribe(
        res => {
          localStorage.setItem('token', null);
          localStorage.setItem('refresh_token', null);
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  // Verifica se o token é valido
  public check() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    this.http.get(this.baseUrl + 'api/status', {headers})
      .subscribe(
        res => {
          this.status_login = res['status'];
          if (this.status_login) {
            this.router.navigate(['/starterview']);
          }
        },
        err => {
          this.status_login = false;
        }
      );
  }

  // Obitem o token que ja foi gerado pelo usuário
  public getToken() {
    return localStorage.getItem('token');
  }
}
