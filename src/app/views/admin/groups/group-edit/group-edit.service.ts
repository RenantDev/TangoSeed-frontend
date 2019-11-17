import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Group} from '../group';
import {Observable} from 'rxjs';
import {ConfigGlobal} from '../../../../services/config-global';


@Injectable({
  providedIn: 'root'
})
export class EditGroupModalService {

  group: any;

  constructor(private http: HttpClient, private config: ConfigGlobal) {
  }

  // getSelectGroup() {
  //   const headers = new HttpHeaders({
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
  //   });

  //   const url = this.config.GLOBAL_URL + 'api/admin/groups/list';

  //   this.http.get(url, {headers})
  //     .subscribe(data => {
  //         this.group = data;
  //       },
  //       err => {

  //       },
  //       () => {
  //       console.log(this.group)
  //       });
  // }

  getGroupInfo(group: Group): Observable<Group> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    });

    const url = this.config.GLOBAL_URL + 'api/admin/group/' + group.id;

    return this.http.get<Group>(url, {headers});
  }
}
