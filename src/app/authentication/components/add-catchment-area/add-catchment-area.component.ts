import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlllistService } from 'src/app/services/alllist.service';
import { AlertService } from './../../../shareds/services/alert.service';
import { IAmphurItem, ITambonItem, IVillageItem, IWorkItem } from './../../../shareds/components/listplace/listplace.interface';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { IResponsible } from './add-catchment-area.interface';
import { Router } from '@angular/router';
import { ResponsibleService } from '../../services/responsible.service';


@Component({
  selector: 'app-add-catchment-area',
  templateUrl: './add-catchment-area.component.html',
  styleUrls: ['./add-catchment-area.component.css']
})
export class AddCatchmentAreaComponent implements OnInit, OnDestroy {

  AppURL = AppURL;
  AuthURL = AuthURL;
  form: FormGroup;

  amphurs: IAmphurItem[];
  tambons: ITambonItem[];
  villages: IVillageItem[];
  works: IWorkItem[];

  responsible: IResponsible;
  MyResponsible: IResponsible[];

  private subscr: Subscription;
  private subscr2: Subscription;



  displayedColumns: string[] = ['id_responsible', 'ampurname', 'tambonname', 'villagename', 'work', 'address', 'edit', 'delete'];
  dataSource: MatTableDataSource<IResponsible>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private addlist: AlllistService,
    private account: AccountService,
    private authen: AuthenService,
    private responsibleService: ResponsibleService

  ) {
    this.initailCreateFormData();
  }

  ngOnInit() {
    this.onChanges();
    this.getAmphurs();
    this.getWorks();
    setTimeout(() => this.MyResposible(), 100);

  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
    this.subscr2.unsubscribe();
  }

  private initailCreateFormData() {
    this.form = this.builder.group({
      amphur: ['', Validators.required],
      tambon: ['', Validators.required],
      r_villagecodefull: ['', Validators.required],
      r_villagecode: ['', Validators.required],
      id_work: ['', Validators.required],
      r_id_user: ['', Validators.required],
      address: [''],
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChanges() {
    this.disbleAll();
    this.subscr = this.form.get('amphur').valueChanges
      .subscribe(amphur => {
        if (amphur == '') {

          this.form.get('tambon').disable();
          this.form.get('r_villagecodefull').disable();
          this.form.get('id_work').disable();
          this.form.get('address').disable();
        }
        else {
          this.resetAll();
          this.getTambons(amphur);
        }

      });

    this.subscr2 = this.form.get('tambon').valueChanges
      .subscribe(tambon => {
        if (tambon == '') {
          //this.form.get('type').reset();
          this.form.get('id_work').disable();
          this.form.get('address').disable();
        }
        else {
          this.getvillages(tambon);
        }
      });
  }

  getTambons(amphurcode) {
    this.disbleAll();
    this.addlist
      .getTambons(amphurcode)
      .then(tambons => {
        this.form.get('tambon').enable();
        this.tambons = tambons
      }
      )
      .catch(err =>
        this.authen.checkMessage(err));
    //this.alert.notify(err.Message));
  }

  getAmphurs() {
    this.disbleAll();
    this.addlist
      .getAmphurs()
      .then(amphurs =>
        this.amphurs = amphurs
      )
      .catch(err =>
        this.authen.checkMessage(err));
    //this.alert.notify(err.Message));
  }

  getWorks() {
    this.addlist
      .getWorks()
      .then(works =>
        this.works = works
      )
      .catch(err => {
        //this.alert.notify(err.Message);
        this.authen.checkMessage(err);
      });
  }



  getvillages(tamboncode) {
    this.addlist
      .getVillages(tamboncode)
      .then(villages => {
        if (villages.length) {
          this.villages = villages;
          this.form.get('r_villagecodefull').enable();
          this.form.get('id_work').enable();
          this.form.get('address').enable();
        }
        else {
          this.alert.notify("ไม่พบหมู่บ้าน", "warning");
          this.form.get('r_villagecodefull').reset("");
          this.form.get('r_villagecodefull').disable();
        }
      }
      )
      .catch(err =>
        this.authen.checkMessage(err));
    //this.alert.notify(err.Message));
  }

  disbleAll() {
    this.form.get('tambon').disable();
    this.form.get('r_villagecodefull').disable();
    this.form.get('id_work').disable();
    this.form.get('address').disable();
  }

  resetAll() {
    this.form.get('tambon').reset("");
    this.form.get('r_villagecodefull').reset("");
  }

  // get f() { return this.form.controls; }

  onAddCatchmemnt() {
    this.form.patchValue({
      r_villagecode: (this.form.get('r_villagecodefull').value as string).substr(6, 7),
      r_id_user: this.account.UserLogin.id_user
    });

    if (this.form.invalid) return this.alert.someting_wrong();

    this.responsible = this.form.value;

    this.responsibleService.addResponsible(this.responsible)
      .then(res => {
        if (res) {
          this.alert.notify("เพิ่มข้อมูลสำเร็จแล้ว", "info");
          this.MyResposible();
        }

      }).catch(err => {
        this.authen.checkMessage(err);
      });

  }

  MyResposible() {
    this.responsibleService.getResponsible(this.account.UserLogin.id_user)
      .then(res => {
        if (res) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //console.log(this.MyResponsible);
        }

      }).catch(err => {
        this.authen.checkMessage(err);
        this.dataSource = null;
      });
  }
}
