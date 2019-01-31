import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'app/services/admin/users.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigGlobal } from 'app/services/config-global';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  formulario: FormGroup;

  public groups: any;

  public nameCss: any;
  public emailCss: any;
  public passwordCss: any;
  public groupCss: any;

  public emailErrorMsg: any;
  public nameErrorMsg: any;
  public passwordErrorMsg: any;
  public groupErrorMsg: any;

  public successMsg: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private config: ConfigGlobal) { }

  ngOnInit() {
    // Define os campos do formulario
    this.formulario = this.formBuilder.group({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      group: new FormControl()
    });

    // Define os grupos de usuários
    this.getSelectGroup();
  }

  // Cadastra novo usuário
  onSubmit() {
    // Define o cabeçario do POST
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    // Desativa os campos do formulário temporariamente
    this.formulario.disable();

    // Envia o POST para o backend
    this.http.post(this.config.GLOBAL_URL + 'api/admin/users', this.formulario.value, { headers })
      .subscribe(data => {

        // Remove qualquer msg de erro na tela
        this.applyCssError();

        // Cadastro realizado com sucesso
        this.applyCssSuccess(true);

        // Limpa o formulário
        this.formulario.reset();

        // Reativa os campos do formulário
        this.formulario.enable();

      },
        (error: any) => {
          // Exibe os erros na tela
          this.applyCssError(error);

          // Reativa os campos do formulário
          this.formulario.enable();
        }
      );
  }

  // Exibe ou não o sucesso do cadastro
  applyCssSuccess(success = false) {
    if (success) {
      this.successMsg = true;
    } else {
      this.successMsg = false;
    }
  }

  // Exibe ou não a lista de erros de cadastro
  applyCssError(error = null) {

    this.applyCssSuccess();
    if (error === null) {
      // Caso nenhum erro seja encontrado reinicia o CSS
      this.resetImputError();
    } else {

      if (typeof error['error']['errors']['email'] !== 'undefined') {
        this.emailCss = {
          'error': true
        };
        this.emailErrorMsg = error['error']['errors']['email'];
      } else {
        this.emailCss = {
          'error': false
        };
        this.emailErrorMsg = false;
      }
      if (typeof error['error']['errors']['name'] !== 'undefined') {
        this.nameCss = {
          'error': true
        };
        this.nameErrorMsg = error['error']['errors']['name'];
      } else {
        this.nameCss = {
          'error': false
        };
        this.nameErrorMsg = false;
      }
      if (typeof error['error']['errors']['password'] !== 'undefined') {
        this.passwordCss = {
          'error': true
        };
        this.passwordErrorMsg = error['error']['errors']['password'];
      } else {
        this.passwordCss = {
          'error': false
        };
        this.passwordErrorMsg = false;
      }
      if (typeof error['error']['errors']['group'] !== 'undefined') {
        this.groupCss = {
          'error': true
        };
        this.groupErrorMsg = error['error']['errors']['group'];
      } else {
        this.groupCss = {
          'error': false
        };
        this.groupErrorMsg = false;
      }
    }
  }

  // Limpa a lista de erros
  resetImputError() {
    this.emailCss = {
      'error': false
    };
    this.emailErrorMsg = false;

    this.nameCss = {
      'error': false
    };
    this.nameErrorMsg = false;

    this.passwordCss = {
      'error': false
    };
    this.passwordErrorMsg = false;

    this.groupCss = {
      'error': false
    };
    this.groupErrorMsg = false;
  }

  // Reinicia o formulário de cadastro
  resetForm() {
    this.resetImputError();
    this.formulario.reset();
  }

  // Busca os grupos de usuários do sistema
  getSelectGroup() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/groups/list';

    this.http.get(url, { headers })
      .subscribe(data => {
        this.groups = data;
      });
  }

}

