import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import {AuthService} from "../../../services/login/auth.service";
import {VarGlobal} from "../../../services/var-global";

declare var jQuery: any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html',
  providers: [AuthService]
})

export class NavigationComponent {

  constructor(private router: Router, private login: AuthService, public varGlobal: VarGlobal) {
  }

  public mainMenu: Array<any>;

  ngOnInit() {

    this.mainMenu = JSON.parse(sessionStorage.getItem("menu"));

    // Obtem informações basicas do usuário
    this.login.getInfo()
      .then((res) => {
        this.varGlobal.USER_NAME = res['data']['name'];
        this.varGlobal.USER_AVATAR = res['data']['avatar'];
        // this.varGlobal.USER_GROUP = res['data']['group'];
      });

  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }

  logout() {
    this.login.logout();
  }


}
