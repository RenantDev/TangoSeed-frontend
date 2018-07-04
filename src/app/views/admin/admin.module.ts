import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersComponent, GroupsComponent, RolesComponent]
})
export class AdminModule { }