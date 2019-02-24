import { Injectable } from '@angular/core';
import { AccountService } from '../shareds/services/account.service';
import { Router } from '@angular/router';
import { AppURL } from '../app.url';
import { AlertService } from '../shareds/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(
    private account: AccountService,
    private router: Router,
    private alert: AlertService
  ) { }

  private accessKey = 'respon';

  setAuthenticated(accessToken: string) {
    localStorage.setItem(this.accessKey, accessToken);
  }

  getAuthenticated(): string {
    return localStorage.getItem(this.accessKey);
  }

  clearAuthenticated(): void {
    //localStorage.removeItem(this.accessKey);
    this.account.UserLogin = {} as any;
    localStorage.clear();

  }

  checkMessage(message) {
    if (message.error.statusCode == 401) {
      this.clearAuthenticated()
      this.alert.notify("หมดเวลา กรุณาเข้าสู่ระบบใหม่");
      this.router.navigate(['/', AppURL.Login]);
    }else  this.alert.notify(message.Message);

  }
}
