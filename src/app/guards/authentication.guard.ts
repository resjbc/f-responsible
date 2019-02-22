import { Injectable } from '@angular/core';
import { AuthenService } from '../services/authen.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppURL } from '../app.url';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authen: AuthenService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authen.getAuthenticated()) return true;
    
    this.router.navigate(['/', AppURL.Login, { returnURL: state.url }]);
    return false;
  }

}
