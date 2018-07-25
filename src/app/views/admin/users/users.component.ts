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

    this.usersService.getUserList().then((res) => {
      console.log(res['data']);
    });

    $('.dataTables-users').DataTable({
      pageLength: 2,
      responsive: true,
      dom: '<"html5buttons"B>lTfgitp',
      language: this.configGlobal.TABLE_LANG,
      buttons: [
        // { extend: 'copy'},
        // {extend: 'csv'},
        // {extend: 'excel', title: 'ExampleFile'},
        // {extend: 'pdf', title: 'ExampleFile'},
        //
        // {extend: 'print',
        //   customize: function (win){
        //     $(win.document.body).addClass('white-bg');
        //     $(win.document.body).css('font-size', '10px');
        //
        //     $(win.document.body).find('table')
        //       .addClass('compact')
        //       .css('font-size', 'inherit');
        //   }
        // }
      ]
    });

  }

  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
  }

}
