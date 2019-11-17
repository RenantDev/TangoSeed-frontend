import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatFormField} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {ConfigGlobal} from '../../../../services/config-global';
import {Group} from '../group';

declare var $: any;

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css'],
})
export class GroupTableComponent implements OnInit, OnDestroy {
// Variaveis de Edição do usuário
  editGroup: any;
  groupEditing: any;

  // Variaveis da Tabela
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'menu'];
  groupList: AdminGroupsHttpDao | null;
  data: Group[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 15;
  current_page = 1;

  selectValueOption = null;
  inputValue = null;

  // @ViewChild(EditGroupModalComponent) editModal: EditGroupModalComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatFormField) search: MatFormField;

  constructor(private http: HttpClient, private configGlobal: ConfigGlobal) {
  }

  ngOnInit() {
    this.groupList = new AdminGroupsHttpDao(this.http, this.configGlobal);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.tableRefresh();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.groupList!.getRepoIssues(
            this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.selectValueOption,
            this.inputValue
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data['total'];
          this.pageSize = data['per_page'];
          this.current_page = data['current_page'];

          return data['data'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
// editModal = new EditUserModalComponent;
  // Edita usuário do sistema
  editGroupModal(id) {
    // Abre model e busca a informação do usuário no sistema de acordo com o ID fornecido pela tabela.
    this.editGroup = new AdminGroupsHttpDao(this.http, this.configGlobal);

    this.editGroup!.getUserInfo(id).subscribe(
      result => {
        this.groupEditing = result;
      },
      err => {
        console.log(err);
      },
      () => {
        if (this.groupEditing.data !== undefined) {
          // Define as informações do modal
          // this.editModal.openM(this.groupEditing.data);
        } else {
          Swal.fire({
            title: 'Erro!',
            text: 'O usuário não existe ou foi excluido!',
            type: 'warning',
          });
          this.tableRefresh();
        }
      }
    );
  }
  tableRefresh(reset = false) {

    if (reset) {
      this.selectValueOption = null;
      this.inputValue = null;
    }
    this.paginator._changePageSize(this.paginator.pageSize);

  }

  onSubmit() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  applyFilterSelect(selectValue: string) {
    this.selectValueOption = selectValue.trim().toLowerCase();
  }

  // Filtro de usuários do sistema
  applyFilterInput(filterValue: string) {
    this.inputValue = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {

  }
} 

export interface GroupList {
  items: Group[];
  total_count: number;
}


export class AdminGroupsHttpDao {

  private pgSize: any;

  constructor(private http: HttpClient, private config: ConfigGlobal) {
  }

  getRepoIssues(sort: string, order: string, page: number, pageSizeOptions: number, find: string, selectValueOption: string): Observable<GroupList> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    if (find === undefined || find === '' || find === null || selectValueOption === null) {
      find = '';
    } else {
      find = 'search=' + selectValueOption + '&searchFields=' + find + ':like&';
    }

    if (order === undefined) {
      order = '';
    } else {
      order = 'orderBy=' + order + '&';
    }

    if (pageSizeOptions === undefined) {
      this.pgSize = '';
    } else {
      this.pgSize = '&limit=' + pageSizeOptions;
    }

    const href = this.config.GLOBAL_URL + 'api/admin/groups';
    const requestUrl = href + `?` + find + `${order}sortedBy=${sort}&page=${page + 1}${this.pgSize}`;

    return this.http.get<GroupList>(requestUrl, {headers});
  }

  getGroupInfo(groupID: number): Observable<Group> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/groups/' + groupID;

    return this.http.get<Group>(url, {headers});
  }

}