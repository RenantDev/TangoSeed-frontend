import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from "@angular/router";
import { ConfigGlobal } from "../config-global";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router, private config: ConfigGlobal) { }

  getUserList() {
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      });

      this.http.get(this.config.GLOBAL_URL + 'api/admin/users?filter=id;name;email;status&orderBy=id&sortedBy=desc', { headers })
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          (err) => {
            resolve(false);
          }
        );
    });
  }
}
