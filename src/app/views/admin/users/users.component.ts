import {Component, OnDestroy, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public nav: any;


  constructor() {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit() {
    this.nav.className += ' white-bg';
  }

  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
  }

}
