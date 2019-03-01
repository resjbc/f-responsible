import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';

export interface IAddItemComponent {
    modalRef: BsModalRef;
    form: FormGroup;

    onSubmit(): void;
}

export interface IAmphurItem {
    ampurcode: string;
    ampurcodefull: string;
    changwatcode: string;
    ampurname: string;
    flag_status?: string;
}

export interface ITambonItem {
    tamboncode: string;
    tamboncodefull: string;
    ampurcode: string;
    changwatcode: string;
    tambonname: string;
    flag_status?: string;
}

export interface IVillageItem {
    villagecode: string;
    villagecodefull: string;
    tamboncode: string;
    ampurcode: string;
    changwatcode: string;
    villagename: string;
    flag_status: string;
}

export interface IHospitalItem {
    hoscode: string;
    hosname: string;
    hostype: string;
    address: string;
    road: string;
    mu: string;
    subdistcode: string;
    distcode: string;
    provcode: string;
}

export interface IWorkItem {
    id_work?: number;
    work: string;
    active: boolean;
}



