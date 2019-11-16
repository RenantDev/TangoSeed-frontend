import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';
import { ScopesComponent } from './scopes/scopes.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule } from '@angular/material';
import { UserTableComponent } from './users/user-table/user-table.component';
import { HttpClientModule } from '@angular/common/http';
import { UserMenuComponent } from './users/user-menu/user-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserModalComponent } from './users/user-table/edit-user-modal/edit-user-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GroupTableComponent } from './groups/group-table/group-table.component';
import { GroupMenuComponent } from './groups/group-menu/group-menu.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    NgbModule
  ],
  declarations: [
    UsersComponent,
    GroupsComponent,
    RolesComponent,
    ScopesComponent,
    UserTableComponent,
    UserMenuComponent,
    EditUserModalComponent,
    GroupTableComponent,
    GroupMenuComponent,
    GroupEditComponent
  ]
})
export class AdminModule { }
