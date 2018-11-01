import { Component, OnDestroy, OnInit } from '@angular/core';
import {ConfigGlobal} from "../../../services/config-global";

import {UsersService} from "../../../services/admin/users.service";

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit, OnDestroy {

  public nav: any;


  constructor(private configGlobal: ConfigGlobal, private usersService: UsersService) {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit() {

    this.nav.className += ' white-bg';

    // this.usersService.getUserList().then((res) => {
    //   console.log(res['data']);
    // });

  }

  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
  }

}
