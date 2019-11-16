import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

declare var $: any;

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GroupTableComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'name', 'count_users', 'status', 'menu'];
  expandedElement: PeriodicElement | null;

  constructor() {
  }

  ngOnInit() {

  }

}

export interface PeriodicElement {
  id: number;
  name: string;
  count_users: number;
  status: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    name: 'Developer',
    count_users: 1,
    status: 1,
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    id: 2,
    name: 'Administrator',
    count_users: 15,
    status: 1,
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    id: 3,
    name: 'Client',
    count_users: 55000,
    status: 1,
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  },
];
