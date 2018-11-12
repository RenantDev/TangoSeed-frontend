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

  private nameCss: any;
  private emailCss: any;
  private passwordCss: any;

  private emailErrorMsg: any;
  private nameErrorMsg: any;
  private passwordErrorMsg: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private config: ConfigGlobal) { }

  ngOnInit() {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    //   senha: new FormControl(null)
    // });

    // this.formulario = this.formBuilder.group({
    //   name: [null, [
    //     Validators.minLength(3),
    //     Validators.maxLength(60),
    //     Validators.required
    //   ]],
    //   email: [null, [
    //     Validators.required,
    //     Validators.email,
    //   ]],
    //   password: [null, [
    //     Validators.required,
    //     Validators.minLength(3),
    //     Validators.maxLength(60),
    //   ]],
    // });
    this.formulario = this.formBuilder.group({
      name: null,
      email: null,
      password: null,
    });

  }

  onSubmit() {
    // console.log(this.formulario.value);
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    this.formulario.disable();
    console.log(this.emailCss);

    this.http.post(this.config.GLOBAL_URL + 'api/admin/users', this.formulario.value, { headers })
      .subscribe(data => {
        this.formulario.enable();
        this.formulario.reset();
        this.applyCssError();
      },
        (error: any) => {
          console.log(error['error']['errors']['email']);

          this.applyCssError(error);

          this.formulario.enable();
          // console.log(error.statusText);
        }
      );
  }

  applyCssError(error = null) {

    console.log(error);

    if (error === null) {
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
    }
  }

  resetForm() {
    this.formulario.reset();
  }

}

