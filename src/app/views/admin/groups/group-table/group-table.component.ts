import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

declare var $: any;

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css'],
})
export class GroupTableComponent implements OnInit {

  dataSource = GROUPS_DATA;
  groupList: GroupList | null;


  constructor() {
  }

  ngOnInit() {
    $('.dual_select').bootstrapDualListbox({
      selectorMinimalHeight: 160
    });
  }


}

export interface GroupList {
  id: number;
  name: string;
  status: number;
  description: string;
  roles: any;
  roles_select: any;
}

const GROUPS_DATA: GroupList[] = [
  {
    id: 1,
    name: 'Developer',
    status: 1,
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
    roles: [
      {
        id: 1,
        title: 'Resumo Dev',
        description: 'Função para Desenvolvedor',
        group_id: 1,
        role_id: 2,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 2,
        title: 'Administrador',
        description: 'Administração do sistema.',
        group_id: 2,
        role_id: 3,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 3,
        title: 'Usuários',
        description: 'Gerenciador de usuários do sistema',
        group_id: 2,
        role_id: 4,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 4,
        title: 'Grupos',
        description: 'Gerenciador de grupos do sistema',
        group_id: 2,
        role_id: 5,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 5,
        title: 'Funções',
        description: 'Gerenciador de funções do sistema',
        group_id: 2,
        role_id: 6,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 6,
        title: 'Extenções',
        description: 'Gerenciador de extenções do sistema',
        group_id: 2,
        role_id: 7,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      }
    ],
    roles_select: []
  }, {
    id: 2,
    name: 'Administrator',
    status: 1,
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
    roles: [
      {
        id: 1,
        title: 'Resumo Dev',
        description: 'Função para Desenvolvedor',
        group_id: 1,
        role_id: 2,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 2,
        title: 'Administrador',
        description: 'Administração do sistema.',
        group_id: 2,
        role_id: 3,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 3,
        title: 'Usuários',
        description: 'Gerenciador de usuários do sistema',
        group_id: 2,
        role_id: 4,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 4,
        title: 'Grupos',
        description: 'Gerenciador de grupos do sistema',
        group_id: 2,
        role_id: 5,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 5,
        title: 'Funções',
        description: 'Gerenciador de funções do sistema',
        group_id: 2,
        role_id: 6,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 6,
        title: 'Extenções',
        description: 'Gerenciador de extenções do sistema',
        group_id: 2,
        role_id: 7,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      }
    ],
    roles_select: []
  }, {
    id: 3,
    name: 'Client',
    status: 1,
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
    roles: [
      {
        id: 1,
        title: 'Resumo Dev',
        description: 'Função para Desenvolvedor',
        group_id: 1,
        role_id: 2,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 2,
        title: 'Administrador',
        description: 'Administração do sistema.',
        group_id: 2,
        role_id: 3,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 3,
        title: 'Usuários',
        description: 'Gerenciador de usuários do sistema',
        group_id: 2,
        role_id: 4,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 4,
        title: 'Grupos',
        description: 'Gerenciador de grupos do sistema',
        group_id: 2,
        role_id: 5,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 5,
        title: 'Funções',
        description: 'Gerenciador de funções do sistema',
        group_id: 2,
        role_id: 6,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      },
      {
        id: 6,
        title: 'Extenções',
        description: 'Gerenciador de extenções do sistema',
        group_id: 2,
        role_id: 7,
        created_at: '2019-05-29 16:26:04',
        updated_at: '2019-05-29 16:26:04'
      }
    ],
    roles_select: []
  },
];
