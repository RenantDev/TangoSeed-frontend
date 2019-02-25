import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {EditUserModalService} from './edit-user-modal.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConfigGlobal} from '../../../../../services/config-global';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  userEditForm: FormGroup;
  userInfoEdit: any;

  public groups: any;

  constructor(private formBuilder: FormBuilder, private editUserService: EditUserModalService, private http: HttpClient, private router: Router, private config: ConfigGlobal) {

  }

  ngOnInit() {

    // Inicia o form de edição
    this.userEditForm = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      status: new FormControl(),
      group: new FormControl()
    });

    console.log(this.formatSelectGroup());

  }

  openM(userInfo: any) {

    // Define o usuário que esta sendo editado
    this.userInfoEdit = userInfo;

    // Reseta formulario
    this.userEditForm.reset();

    // Define as informações dos campos do form
    this.userEditForm.setValue({
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      password: '',
      status: userInfo.status,
      group: ''
    });

  }

  formatSelectGroup() {
    this.editUserService.getSelectGroup();
    return this.editUserService.group;
  }

  onSubmit() {

    // Se não existir um password remove da array
    if (
      this.userEditForm.value.password === '' ||
      this.userEditForm.value.password === undefined ||
      this.userEditForm.value.password === null ||
      this.userEditForm.value.password === ' '
    ) {
      delete this.userEditForm.value.password;
    } else {
      this.userInfoEdit.password = this.userEditForm.value.password;
    }

    // Se não existir um grupo ou se o grupo permanece o mesmo, remove da array
    if (
      this.userEditForm.value.group === '' ||
      this.userEditForm.value.group === undefined ||
      this.userEditForm.value.group === null ||
      this.userEditForm.value.group === ' ' ||
      this.userInfoEdit.group === this.userEditForm.value.group
    ) {
      delete this.userEditForm.value.group;
    } else {
      this.userInfoEdit.group = this.userEditForm.value.group;
    }

    // Verifica se o email foi alterado
    if (this.userInfoEdit.email === this.userEditForm.value.email) {
      delete this.userEditForm.value.email;
    } else {
      this.userInfoEdit.email = this.userEditForm.value.email;
    }
    // Verifica se o status foi alterado
    if (this.userInfoEdit.status === this.userEditForm.value.status) {
      delete this.userEditForm.value.status;
    } else {
      this.userInfoEdit.status = this.userEditForm.value.status;
    }
    // Verifica se o name foi alterado
    if (this.userInfoEdit.name === this.userEditForm.value.name) {
      delete this.userEditForm.value.name;
    } else {
      this.userInfoEdit.name = this.userEditForm.value.name;
    }

    if (
      this.userEditForm.value.email ||
      this.userEditForm.value.name ||
      this.userEditForm.value.status ||
      this.userEditForm.value.group
    ) {
      // Define o cabeçario do POST
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      });

      // Envia o POST para o backend
      this.http.post(this.config.GLOBAL_URL + 'api/admin/users/' + this.userEditForm.value.id, this.userEditForm.value, {headers})
        .subscribe(data => {
            console.log('processando atualização');
            console.log(data);

          },
          (error: any) => {
            console.log('erro no processo de atualização');
            console.log(error);
          },
          () => {
            console.log('Atualização executanda com exito!');
          }
        );
    } else {
      console.log('Nenhum dado foi alterado.');
    }
  }


}
