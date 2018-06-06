import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap';

// declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public nav: any;

  constructor() {
    this.nav = document.querySelector('nav.navbar');
  }

  public ngOnInit(): any {
    this.nav.className += ' white-bg';
  }


  public ngOnDestroy(): any {
    this.nav.classList.remove('white-bg');
  }

  public openModal() {
    // $('#myModal').modal('show');
  }

}
