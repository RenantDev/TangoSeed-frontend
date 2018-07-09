import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';
import { ScopesComponent } from './scopes/scopes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersComponent, GroupsComponent, RolesComponent, ScopesComponent]
})
export class AdminModule { }
