import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersComponent, GroupsComponent]
})
export class AdminModule { }
