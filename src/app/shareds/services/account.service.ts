import { Injectable } from '@angular/core';
import { HttpService } from '../../authentication/services/http.service';
import { IAccount, ILogin } from '../../components/login/login.interface';
import { IChangePassword } from '../../../app/authentication/components/profile/change-password/change-password.interface';
import { IMember } from '../../../app/authentication/components/management-user/member.interface';
import { IRegister } from '../../../app/components/register/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpService) { }

  // store user login ไว้
  public UserLogin: IAccount = {} as any;

  public setUserLogin(userLogin: IAccount) {
    this.UserLogin.id_user = userLogin.id_user;
    this.UserLogin.firstname = userLogin.firstname;
    this.UserLogin.lastname = userLogin.lastname;
    this.UserLogin.password = userLogin.password;
    this.UserLogin.username = userLogin.username;
    this.UserLogin.role = userLogin.role;
    this.UserLogin.cid = userLogin.cid;
    this.UserLogin.position = userLogin.position;
    return this.UserLogin;
  }

  onLogin(model: ILogin) {
    return this.http
      .requestPost(`login`, model)
      .toPromise() as Promise<{ accessToken: string }>;
  }

  async getUserLogin(accessToken: string) {
    const userLogin = await (this.http
      .requestGet(`account/data`, accessToken)
      .toPromise() as Promise<IAccount>);
      
    return this.setUserLogin(userLogin);
  }


  //เปลี่ยนรหัสผ่านใหม่
  onChangePassword(accessToken: string, model: IChangePassword) {
    return this.http
      .requestPost('account/change-password', model, accessToken)
      .toPromise() as Promise<any>;

  }



  //แก้ไขข้อมูลส่วนตัว Update Progile
  async onUpdateProfile(accessToken: string, model: IMember) {

    const user = await (this.http
      .requestPost('api/member/profile', model, accessToken)
      .toPromise() as Promise<IAccount>);
    return this.setUserLogin(user);

  }

  onRegister(model: IRegister) {
    return this.http.requestPost('register', model)
      .toPromise() as Promise<IAccount>;
  }

}
