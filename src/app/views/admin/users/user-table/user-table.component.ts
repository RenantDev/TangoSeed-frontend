import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ConfigGlobal } from 'app/services/config-global';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'menu'];
  exampleDatabase: ExampleHttpDao | null;
  data: User[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 15;
  current_page = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private configGlobal: ConfigGlobal) { }

  ngOnInit() {

    this.exampleDatabase = new ExampleHttpDao(this.http, this.configGlobal);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.direction, this.sort.active,  this.paginator.pageIndex);
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

  getRepoIssues(sort: string, order: string, page: number): Observable<UserList> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    if(order === undefined){
      order = '';
    }

    const href = this.config.GLOBAL_URL + 'api/admin/users';
    const requestUrl = href + `?orderBy=${order}&sortedBy=${sort}&page=${page + 1}`;

    console.log(requestUrl);

    return this.http.get<UserList>(requestUrl, { headers });
  }
}
