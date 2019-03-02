import { Injectable } from '@angular/core';
import { HttpService } from '../authentication/services/http.service';
import { IPositionItem } from '../components/login/login.interface';
import { IAmphurItem, IHospitalItem, ITambonItem, IWorkItem, IVillageItem } from '../shareds/components/listplace/listplace.interface';
import { AuthenService } from './authen.service';


@Injectable({
  providedIn: 'root'
})
export class AlllistService {

  constructor(
    private http: HttpService,
    private authen: AuthenService,
    ) { }

  getPositions() {
    return this.http
      .requestGet(`list/positions`)
      .toPromise() as Promise<IPositionItem[]>;
  }

  getAmphurs(){
    return this.http
    .requestGet(`list/amphurs`)
    .toPromise() as Promise<IAmphurItem[]>;
  }

  getTambons(amphurcode){
    return this.http
    .requestGet(`list/tambons/${amphurcode}`)
    .toPromise() as Promise<ITambonItem[]>;
  }

  getVillages(tamboncode){
    return this.http
    .requestGet(`list/villages/${tamboncode}`)
    .toPromise() as Promise<IVillageItem[]>;
  }


  getHospitals(params){
    return this.http
    .requestGet_Param(`list/hospitals`,params)
    .toPromise() as Promise<IHospitalItem[]>;
  }

  getWorks() {
    return this.http
      .requestGet(`work`,this.authen.getAuthenticated())
      .toPromise() as Promise<IWorkItem[]>;
  }

  addWorks(work: IWorkItem) {
    return this.http
      .requestPost(`work`,work,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  updateWorks(work: IWorkItem) {
    return this.http
      .requestPut(`work`,work,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  removeWork(id_work: string) {
    return this.http
      .requestDelete(`work/${id_work}`,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  getPositions_auth() {
    return this.http
      .requestGet(`position`,this.authen.getAuthenticated())
      .toPromise() as Promise<IPositionItem[]>;
  }

  addPositions(position: IPositionItem) {
    return this.http
      .requestPost(`position`,position,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  updatePositions(position: IPositionItem) {
    return this.http
      .requestPut(`position`,position,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  removePosition(id_position: string) {
    return this.http
      .requestDelete(`position/${id_position}`,this.authen.getAuthenticated())
      .toPromise() as Promise<any>;
  }

  
}
