import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, FormArray, FormArrayName} from '@angular/forms';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConfigGlobal} from '../../../../services/config-global';
import Swal from 'sweetalert2';
import { GroupTableComponent } from '../group-table/group-table.component';
import * as _ from "lodash";

declare var $: any;

@Component({
  selector: 'app-group-menu',
  templateUrl: './group-menu.component.html',
  styleUrls: ['./group-menu.component.css']
})
export class GroupMenuComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<boolean>();

  formulario: FormGroup;

  public title: any; 
  public description: any;

  public roles: any; 

  public formListItem: any = [];

  public titleCss: any;
  public titleErrorMsg: any;
  
  public successMsg: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private config: ConfigGlobal, private groupTable: GroupTableComponent) { }

  // Inicia o formulario
  ngOnInit() {
    // Define os campos do formulario
    this.formulario = this.formBuilder.group({
      title: new FormControl(),
      description: new FormControl(),
      roles: [],
    });

    // busca as funcoes do sistema
    this.getSelectRoles();
  }

  // Cria uma array com o ID de cada função do sistema que deve ser add no Grupo
  arrayCheckBox(role){

    // Busca o index do item da array
    var idx = this.formListItem.indexOf(role);

    // Se existir o item na array deve removelo se nao add novo item
    if(idx != -1){
      this.formListItem.splice(idx, 1);  
    }else{
      this.formListItem.push(role);    
    }

    // Define no objeto formulario quais as funções do novo grupo
    this.formulario.setValue({
      title: this.formulario.value.title,
      description: this.formulario.value.description,
      roles: this.formListItem,
    });
    
  }

  // Busca as funcoes do sistema e suas respectivas categorias
  getSelectRoles() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/roles/list';

    this.http.get(url, {headers})
      .subscribe(data => {
        this.roles = data;
      });
  }

  // Reinicia o formulário
  resetForm() {
    // this.resetImputError();
    this.formulario.reset();
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
    this.http.post(this.config.GLOBAL_URL + 'api/admin/groups', this.formulario.value, {headers})
      .subscribe(data => {

          // Remove qualquer msg de erro na tela
          this.applyCssError();

          // Cadastro realizado com sucesso
          this.applyCssSuccess(true);

          // Limpa o formulário
          this.formulario.reset();

          // Reativa os campos do formulário
          this.formulario.enable();

          $('#registerGroup').modal('hide');

          this.groupTable.tableRefresh();

          Swal.fire({
            type: 'success',
            title: 'Novo Grupo',
            text: 'O cadastro do novo Grupo foi realizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });


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

      if (typeof error['error']['errors']['title'] !== 'undefined') {
        this.titleCss = {
          'error': true
        };
        this.titleErrorMsg = error['error']['errors']['title'];
      } else {
        this.titleCss = {
          'error': false
        };
        this.titleErrorMsg = false;
      }
    }
  }

  // Limpa a lista de erros
  resetImputError() {
    this.titleCss = {
      'error': false
    };
    this.titleErrorMsg = false;

  }

}
