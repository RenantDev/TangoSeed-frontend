import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  loggin(data, delay){
    return new Promise(resolve => {
      if(data.username == "test" && data.password == "test"){
        // setTimeout(function() {
        let dataJson = {
          nome: 'Pedro Hymino',
          email: 'pedro@gmail.com'
        };
        localStorage.setItem("database", JSON.stringify(dataJson));
        setTimeout(function() {
          resolve(true);
        }, delay);
      }else{
        setTimeout(function() {
          resolve(false);
        }, delay);
      }
    });
  }

  logoff(){
    if (confirm("Deseja sair ?")) {
      localStorage.removeItem("database");
      this.router.navigateByUrl("login");
    }
  }

}
