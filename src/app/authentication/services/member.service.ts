import { AuthenService } from 'src/app/services/authen.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IMember } from '../components/management-user/member.interface';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  
  constructor(
    private http: HttpService,
    private authen: AuthenService
    ) { }


  getMembers() {
    return this.http
               .requestGet(`user/users`,this.authen.getAuthenticated())
               .toPromise() as Promise<IMember[]>;
  }

  getMembers_forAdmin() {
    return this.http
               .requestGet(`person/`,this.authen.getAuthenticated())
               .toPromise() as Promise<IMember[]>;
  }

  addMember(member) {
    return this.http
               .requestPost(`user`,member,this.authen.getAuthenticated())
               .toPromise() as Promise<IMember>;
  }

  updateMember(member) {
    return this.http
               .requestPut(`user`,member,this.authen.getAuthenticated())
               .toPromise() as Promise<any>;
  }

  removeMember(member) {
    return this.http
               .requestDelete(`user/${member}`,this.authen.getAuthenticated())
               .toPromise() as Promise<any>;
  }
}
