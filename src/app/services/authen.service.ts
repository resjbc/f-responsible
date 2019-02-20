import { Injectable } from '@angular/core';
import { AccountService } from '../shareds/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(private account : AccountService) { }

  private accessKey = 'respon';

  setAuthenticated(accessToken: string) {
    localStorage.setItem(this.accessKey, accessToken);
  }

  getAuthenticated(): string{
    return localStorage.getItem(this.accessKey);
  }

  clearAuthenticated(): void{
    //localStorage.removeItem(this.accessKey);
    this.account.UserLogin = {} as any;
    localStorage.clear();
    
  }
}
