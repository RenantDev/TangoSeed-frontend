import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {ConfigGlobal} from 'app/services/config-global';
import {User} from '../../user';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditUserModalService {

  group: any;

  constructor(private http: HttpClient, private config: ConfigGlobal) {
  }

  getSelectGroup() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/groups/list';

    this.http.get(url, {headers})
      .subscribe(data => {
          this.group = data;
        },
        err => {

        },
        () => {
        console.log(this.group)
        });
  }

  getUserInfo(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/users/' + user.id;

    return this.http.get<User>(url, {headers});
  }
}
