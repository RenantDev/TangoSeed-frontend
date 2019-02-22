import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {EditUserModalService} from './edit-user-modal.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  userEditForm: FormGroup;

  public groups: any;

  constructor(private formBuilder: FormBuilder, private editUserService: EditUserModalService) {

  }

  ngOnInit() {

    // Inicia o form de edição
    this.userEditForm = this.formBuilder.group({
      id: new FormControl({value: null, disabled: true}),
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      status: new FormControl(),
      group: new FormControl()
    });

    console.log(this.formatSelectGroup());

  }

  openM(userInfo: any) {
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

  }


}
