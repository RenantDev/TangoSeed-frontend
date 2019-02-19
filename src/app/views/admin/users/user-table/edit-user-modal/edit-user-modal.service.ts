import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigGlobal } from 'app/services/config-global';
import { User } from '../../user';
import { merge, Observable, of as observableOf } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EditUserModalService {

  constructor(private http: HttpClient, private config: ConfigGlobal) { }

  getSelectGroup() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/groups/list';

    this.http.get(url, { headers })
      .subscribe(data => {
        // this.groups = data;
      });
  }

  getUserInfo(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/user/' + user.id;

    return this.http.get<User>(url, { headers });
  }
}
