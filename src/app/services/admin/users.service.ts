import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from "@angular/router";
import { ConfigGlobal } from "../config-global";
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router, private config: ConfigGlobal) { }

  create(user: any) {

  }

  read(){

  }

  update (){

  }

  delete(){

  }

  list(sort: string, order: string, page: number): Observable<UserList>  {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    if(order === undefined){
      order = '';
    }

    const href = this.config.GLOBAL_URL + 'api/admin/users';
    const requestUrl = href + `?orderBy=${order}&sortedBy=${sort}&page=${page + 1}`;

    return this.http.get<UserList>(requestUrl, { headers });
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
