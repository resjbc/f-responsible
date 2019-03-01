import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IMember } from '../components/management-user/member.interface';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  
  constructor(private http: HttpService) { }

  getMember(pid,accessToken: string) {
    return this.http
               .requestGet(`person/${pid}`,accessToken)
               .toPromise() as Promise<IMember>;
  }

  getMembers(accessToken: string) {
    return this.http
               .requestGet(`person/employee/`,accessToken)
               .toPromise() as Promise<IMember[]>;
  }

  getMembers_forAdmin(accessToken: string) {
    return this.http
               .requestGet(`person/`,accessToken)
               .toPromise() as Promise<IMember[]>;
  }

  addMember(member,accessToken: string) {
    return this.http
               .requestPost(`person/add`,member,accessToken)
               .toPromise() as Promise<IMember>;
  }

  removeMember(member,accessToken: string) {
    return this.http
               .requestDelete(`person/${person}`,accessToken)
               .toPromise() as Promise<any>;
  }
}
