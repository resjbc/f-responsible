import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { AlertService } from '../../services/alert.service';
import { AccountService } from '../../services/account.service';
import { AuthenService } from '../../../services/authen.service';
import { Router } from '@angular/router';
import { IAccount } from '../../../components/login/login.interface';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {

  AppURL = AppURL;
  AuthURL = AuthURL;
  userLogin: IAccount;


  constructor(
    private router: Router,
    private authen: AuthenService,
    private account: AccountService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    //this.userLogin = this.account.UserLogin;
    //console.log(this.userLogin);
  }

  onLogout() {
    this.alert.notify("ออกจากระบบสำเร็จ","info")
    this.authen.clearAuthenticated();
    this.router.navigate(['/', AppURL.Login]);
  }

}
