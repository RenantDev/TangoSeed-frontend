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
    MatIconModule
  ],
  declarations: [
    UsersComponent,
    GroupsComponent,
    RolesComponent,
    ScopesComponent,
    UserTableComponent,
    UserMenuComponent
  ]
})
export class AdminModule { }
