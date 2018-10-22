import {
  Component,
  OnInit,
} from '@angular/core';
import { PaginationConfig } from 'ngx-bootstrap';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  constructor() { }

  /**
   * Inicia a paginação
   */
  ngOnInit() {

  }

}
