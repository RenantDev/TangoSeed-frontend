import {Routes} from '@angular/router';

import {AuthGuard} from "./guards/auth.guard";

import {Dashboard1Component} from './views/dashboards/dashboard1.component';
import {Dashboard2Component} from './views/dashboards/dashboard2.component';
import {Dashboard3Component} from './views/dashboards/dashboard3.component';
import {Dashboard4Component} from './views/dashboards/dashboard4.component';
import {Dashboard5Component} from './views/dashboards/dashboard5.component';

import {ProfileComponent} from './views/profile/profile.component';

import {StarterViewComponent} from './views/appviews/starterview.component';
import {LoginComponent} from './views/login/login.component';

import {BlankLayoutComponent} from './components/common/layouts/blankLayout.component';
import {BasicLayoutComponent} from './components/common/layouts/basicLayout.component';
import {UsersComponent} from "./views/admin/users/users.component";
import {GroupsComponent} from "./views/admin/groups/groups.component";
import {RolesComponent} from "./views/admin/roles/roles.component";

export const ROUTES: Routes = [
  // Main redirect
  // {path: '', redirectTo: 'starterview', pathMatch: 'full'},

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component},
    ],
    canActivate: [AuthGuard]

  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard', component: StarterViewComponent},
      {path: 'profile', component: ProfileComponent},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: BasicLayoutComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'groups', component: GroupsComponent},
      {path: 'roles', component: RolesComponent},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
    ]
  },

  // Handle all other routes
  {path: '**', redirectTo: 'dashboard'}
];
