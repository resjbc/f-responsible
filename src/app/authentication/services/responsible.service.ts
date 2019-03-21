import { AuthenService } from 'src/app/services/authen.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResponsible } from '../components/add-catchment-area/add-catchment-area.interface';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  constructor(
    private http: HttpService,
    private authen: AuthenService
  ) { }

  addResponsible(body) {
    return this.http
      .requestPost(`responsible`, body, this.authen.getAuthenticated())
      .toPromise() as Promise<IResponsible>;
  }

  getResponsible(id_user) {
    return this.http
      .requestGet(`responsible/${id_user}`, this.authen.getAuthenticated())
      .toPromise() as Promise<IResponsible[]>;
  }

  updateResponsible(body) {
    delete body.amphur;
    delete body.tambon;
    console.log(body);
    return this.http
      .requestPut(`responsible`, body ,this.authen.getAuthenticated())
      .toPromise() as Promise<IResponsible>;
  }

  deleteResponsible(id_resposible) {
    return this.http
      .requestDelete(`responsible/${id_resposible}`, this.authen.getAuthenticated())
      .toPromise() as Promise<IResponsible[]>;
  }

  getSearchResponsible(codefull){
    return this.http
    .requestGet(`responsible/search/${codefull}`, this.authen.getAuthenticated())
    .toPromise() as Promise<any>;
  }

}
