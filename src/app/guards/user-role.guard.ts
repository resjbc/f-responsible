import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../shareds/services/account.service';
import { AuthenService } from '../services/authen.service';
import { Observable } from 'rxjs';
import { ERoleAccount } from '../components/login/login.interface';
import { AppURL } from '../app.url';
import { AuthURL } from '../authentication/authentication.url';


@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles: ERoleAccount[] = next.data.roles;
    return new Promise<boolean>((resolve, reject) => {
      this.account.getUserLogin(this.authen.getAuthenticated())
        .then(userLogin => {
          if (roles.filter(item => item == userLogin.role).length > 0)
            resolve(true);
          else {
            if (userLogin.role == 2) {
              this.router.navigate(['/', AppURL.Authen, AuthURL.SearchResponsiblesComponent]);
              resolve(false);
            }
            else {
              this.router.navigate(['/', AppURL.Authen]);
              resolve(false);
            }
          }
        })
        .catch((err) => {
          this.authen.checkMessage(err);
          resolve(false)
        });

    })
  }

}
