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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private config: ConfigGlobal) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: null,
      email: null,
      password: null,
      group: null
    });

    this.getSelectGroup();
  }

  onSubmit() {
    // console.log(this.formulario.value);
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    this.formulario.disable();

    this.http.post(this.config.GLOBAL_URL + 'api/admin/users', this.formulario.value, { headers })
      .subscribe(data => {
        this.formulario.enable();
        this.formulario.reset();
        this.applyCssError();
      },
        (error: any) => {
          this.applyCssError(error);
          this.formulario.enable();
        }
      );
  }

  applyCssError(error = null) {

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

  resetForm() {
    this.resetImputError();
    this.formulario.reset();
  }

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

