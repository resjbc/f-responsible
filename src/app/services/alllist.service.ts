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
}
