import {Injectable} from '@angular/core';
import {Login} from '../../views/login/login';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConfigGlobal} from '../config-global';
import {VarGlobal} from '../var-global';

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private access_token = null;
  private refresh_token = null;

  private status_login: boolean;

  constructor(private http: HttpClient, private router: Router, private config: ConfigGlobal, private varGlobal: VarGlobal) {
  }

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
      client_id: this.config.CLIENT_ID,
      client_secret: this.config.CLIENT_SECRET,
      grant_type: 'password',
      scope: ''
    };

    // Cria um objeto de referencia para todos os alertas
    const refobj = [];

    // Adicionar um alerta no objeto de referencia
    refobj.push($.alert({
      title: '',
      content: () => {
        // Obtem o token com as informações do formulário de login
        this.http.post(this.config.GLOBAL_URL + 'api/login', postData, {headers})
          .subscribe(
            (res) => {
              this.refresh_token = res['refresh_token'].toString();
              localStorage.setItem('refresh_token', this.refresh_token);

              this.access_token = res['access_token'].toString();
              sessionStorage.setItem('token', this.access_token);

              // Obtem informações basicas do usuário
              this.getInfo()
                .then((res) => {
                  sessionStorage.setItem('menu', JSON.stringify(res['menu']));
                  // Fecha todos os alertas referentes ao objeto refobj

                  this.router.navigate(['/dashboard']);
                  $.each(refobj, function (i, a) {
                    a.close(); // you fire close method of all confirms.
                  });
                });
            },
            (err) => {
              $.alert({
                title: '<span style=\'text-align: center\'><strong>Erro!</strong></span>',
                content: err.error.message,
                buttons: {
                  ok: {
                    action: function () {
                      $.each(refobj, function (i, a) {
                        a.close(); // you fire close method of all confirms.
                      });
                    }
                  }
                }
              });
            }
          );
        return '<div class="text-center">Autenticando</div>' +
          '<div class="sk-spinner sk-spinner-cube-grid">\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '<div class="sk-cube"></div>\n' +
          '</div>';
      },
      animationBounce: 1.2,
      buttons: {
        ok: {
          btnClass: 'hide'
        }
      },

    }));


  }

  // Revoga o token e remove do localstorage
  public logout() {

    $.confirm({
      title: 'Logout',
      content: 'Deseja sair do sistema agora?',
      buttons: {
        sim: (() => {
          this.revogaToken();
        }),
        não: function () {

        }
      }
    });

  }

  public revogaToken() {

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });
    this.http.get(this.config.GLOBAL_URL + 'api/logout', {headers})
      .subscribe(
        res => {

          sessionStorage.clear();
          localStorage.clear();

          this.router.navigate(['/login']);
        },
        err => {
          sessionStorage.clear();
          localStorage.clear();

          this.router.navigate(['/login']);
        }
      );
  }

  // Verifica se o token é valido
  public check() {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      });

      this.http.get(this.config.GLOBAL_URL + 'api/status', {headers})
        .subscribe(
          (res: any) => {
            this.status_login = res.status;
            resolve(this.status_login);
          },
          (err) => {
            this.status_login = false;
            resolve(this.status_login)
          }
        );
      ;
    });
  }

  public getInfo() {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      });

      this.http.get(this.config.GLOBAL_URL + 'api/user', {headers})
        .subscribe(
          (res: Array<any>) => {
            resolve(res);
          },
          (err) => {
            resolve(false);
          }
        );
    });
  }


  // Obitem o token que ja foi gerado pelo usuário
  public getToken() {
    return sessionStorage.getItem('token');
  }
}
