import {Component} from '@angular/core';
import {smoothlyMenu} from '../../../app.helpers';
import {AuthService} from "../../../services/login/auth.service";

declare var jQuery: any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor (private login: AuthService){

  }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  logout() {
    this.login.logout();
  }
}
