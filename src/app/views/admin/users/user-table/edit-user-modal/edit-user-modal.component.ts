import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'app/services/admin/users.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigGlobal } from 'app/services/config-global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }

  openModal(id) {

  }

  editUser() {

  }

  onSubmit() {

  }


}
