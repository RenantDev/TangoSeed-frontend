import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatFormField} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {User} from '../user';
import {EditUserModalComponent} from './edit-user-modal/edit-user-modal.component';
import {FormBuilder} from '@angular/forms';
import {ConfigGlobal} from '../../../../services/config-global';
import Swal from 'sweetalert2';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {

// Variaveis de Edição do usuário
  editUser: any;
  userEditing: any;

  // Variaveis da Tabela
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'menu'];
  usersList: AdminUsersHttpDao | null;
  data: User[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 15;
  current_page = 1;

  selectValueOption = null;
  inputValue = null;

  @ViewChild(EditUserModalComponent) editModal: EditUserModalComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatFormField) search: MatFormField;

  constructor(private http: HttpClient, private configGlobal: ConfigGlobal) {
  }


  ngOnInit() {

    this.usersList = new AdminUsersHttpDao(this.http, this.configGlobal);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.tableRefresh();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.usersList!.getRepoIssues(
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

  // editModal = new EditUserModalComponent;
  // Edita usuário do sistema
  editUserModal(id) {
    // Abre model e busca a informação do usuário no sistema de acordo com o ID fornecido pela tabela.
    this.editUser = new AdminUsersHttpDao(this.http, this.configGlobal);

    this.editUser!.getUserInfo(id).subscribe(
      result => {
        this.userEditing = result;
      },
      err => {
        console.log(err);
      },
      () => {
        // Define as informações do modal
        this.editModal.openM(this.userEditing.data);
      }
    );
  }

  deleteUser(id) {
    Swal.fire({
      title: 'Você quer fazer isso?',
      text: 'Todas as informações do usuário serão perdidas!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        // Define o cabeçario do POST
        const headers = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        });

        // Deleta o usuário
        // Envia o POST para o backend
        this.http.delete(this.configGlobal.GLOBAL_URL + 'api/admin/users/' + id, {headers})
          .subscribe(data => {

              // Atualiza a tabela
              this.tableRefresh();

              // Envia um alerta de sucesso
              Swal.fire(
                {
                  title: 'Usuário deletado!',
                  type: 'success',
                  showConfirmButton: false,
                  timer: 1500
                }
              );

            },
            (error: any) => {
              // Atualiza a tabela
              this.tableRefresh();

              // Envia um alerta de erro
              Swal.fire(
                {
                  title: 'Erro!',
                  text: 'Não foi possível deletar o usuário!',
                  type: 'error',
                  showConfirmButton: false,
                  timer: 1500
                }
              );
            }
          );


      }
    })
  }

  onSubmit() {
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

/** An example database that the data source uses to retrieve data for the table. */
export class AdminUsersHttpDao {

  private pgSize: any;

  constructor(private http: HttpClient, private config: ConfigGlobal) {
  }

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

    return this.http.get<UserList>(requestUrl, {headers});
  }

  getUserInfo(userID: number): Observable<User> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/users/' + userID;

    return this.http.get<User>(url, {headers});
  }

}
