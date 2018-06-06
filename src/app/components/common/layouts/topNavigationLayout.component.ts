import { Component } from '@angular/core';
import { detectBody } from '../../../app.helpers';

declare var jQuery: any;

@Component({
  selector: 'topnavigationlayout',
  templateUrl: 'topNavigationLayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class TopNavigationLayoutComponent {

  public OnInit(): any {
    detectBody();
  }

  public onResize() {
    detectBody();
  }

}
