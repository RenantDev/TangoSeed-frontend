import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';
import { ScopesComponent } from './scopes/scopes.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { TableModule } from 'app/components/common/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    TableModule
  ],
  declarations: [UsersComponent, GroupsComponent, RolesComponent, ScopesComponent, UserTableComponent]
})
export class AdminModule { }
