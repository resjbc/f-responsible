import { Component, OnInit } from '@angular/core';
import { IAuthSidebarComponent } from './auth-sidebar.interface';
import { IAccount, ERoleAccount } from '../../../components/login/login.interface';
import { AccountService } from '../../services/account.service';
import { AuthenService } from '../../../services/authen.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';

declare const App;

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {

  Role: typeof ERoleAccount;
  AppURL = AppURL;
  AuthURL = AuthURL;
  userLogin: IAccount // = {} as any;

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router) {
    //this.initailLoadUserlogin();
  }

  ngOnInit() {

  }



  private initailLoadUserlogin() {

    this.userLogin = this.account.UserLogin;
    if (this.userLogin.id_user) return setTimeout(() => App.initialLoadPage(), 100);

    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin_ => {
        this.userLogin = userLogin_;
        //โหลดข้อมูล Script สำหรับ sidebar
        setTimeout(() => App.initialLoadPage(), 100);
      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', this.AppURL.Login]);
      });
  }

  getRoleName(role: ERoleAccount) {
    return ERoleAccount[role];
  }

}
