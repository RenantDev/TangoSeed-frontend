import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatFormField } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ConfigGlobal } from 'app/services/config-global';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'menu'];
  exampleDatabase: ExampleHttpDao | null;
  data: User[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 15;
  current_page = 1;

  selectValueOption = null;
  inputValue = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatFormField) search: MatFormField;

  constructor(private http: HttpClient, private configGlobal: ConfigGlobal) { }

  editModal = new EditUserModalComponent;

  ngOnInit() {

    this.exampleDatabase = new ExampleHttpDao(this.http, this.configGlobal);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.tableRefresh();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
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

  ngOnDestroy() {
  }

  // Edita usuário do sistema
  editUserModal(id) {
    // Abre model e busca a informação do usuário no sistema de acordo com o ID
    this.editModal.openModal(id);
  }

  onSubmit(){
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  tableRefresh(reset = false) {

    if (reset) {
      this.selectValueOption = null;
      this.inputValue = null;
    }
    this.paginator._changePageSize(this.paginator.pageSize);

  }

  applyFilterSelect(selectValue: string) {
    this.selectValueOption = selectValue.trim().toLowerCase();
  }

  // Filtro de usuários do sistema
  applyFilterInput(filterValue: string) {
    this.inputValue = filterValue.trim().toLowerCase();
  }

}

export interface UserList {
  items: User[];
  total_count: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: number;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient, private config: ConfigGlobal) { }

  private pgSize: any;

  getRepoIssues(sort: string, order: string, page: number, pageSizeOptions: number, find: string, selectValueOption: string): Observable<UserList> {
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

    const href = this.config.GLOBAL_URL + 'api/admin/users';
    const requestUrl = href + `?` + find + `${order}sortedBy=${sort}&page=${page + 1}${this.pgSize}`;

    return this.http.get<UserList>(requestUrl, { headers });
  }

}
