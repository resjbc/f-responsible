import { Injectable } from '@angular/core';
import { HttpService } from '../authentication/services/http.service';
import { IPositionItem } from '../components/login/login.interface';
import { IAmphurItem, IHospitalItem } from '../shareds/components/listplace/listplace.interface';


@Injectable({
  providedIn: 'root'
})
export class AlllistService {

  constructor(private http: HttpService) { }

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

  getHospitals(params){
    return this.http
    .requestGet(`list/hospitals`,params)
    .toPromise() as Promise<IHospitalItem[]>;
  }
}
