import { ModaldataService } from './../../../shareds/services/modaldata.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlllistService } from 'src/app/services/alllist.service';
import { AlertService } from './../../../shareds/services/alert.service';
import { IAmphurItem, ITambonItem, IVillageItem, IWorkItem } from './../../../shareds/components/listplace/listplace.interface';
import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { IResponsible, IMyresponsible } from './add-catchment-area.interface';
import { Router } from '@angular/router';
import { ResponsibleService } from '../../services/responsible.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddHeadWorkModalComponent } from './add-head-work-modal/add-head-work-modal.component';


@Component({
  selector: 'app-add-catchment-area',
  templateUrl: './add-catchment-area.component.html',
  styleUrls: ['./add-catchment-area.component.css']
})
export class AddCatchmentAreaComponent implements OnInit, OnDestroy {

  AppURL = AppURL;
  AuthURL = AuthURL;
  form: FormGroup;
  modalRef: BsModalRef;

  amphurs: IAmphurItem[];
  tambons: ITambonItem[];
  villages: IVillageItem[];
  works: IWorkItem[];

  responsible: IResponsible = {} as IResponsible;
  MyResponsible: IMyresponsible[];


  private subscr: Subscription;
  private subscr2: Subscription;
  private subscr3: Subscription;

  flagEdit: boolean = false;



  displayedColumns: string[] = ['id_responsible', 'ampurname', 'tambonname', 'villagename', 'work', 'address', 'edit', 'delete'];
  dataSource: MatTableDataSource<IMyresponsible>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private addlist: AlllistService,
    private account: AccountService,
    private modalService: BsModalService,
    private authen: AuthenService,
    private responsibleService: ResponsibleService,
    public modalservice: ModaldataService

  ) {
    this.initailCreateFormData();
    //this.modalService.onShow.subscribe(() => {});
    this.modalService.onHide.subscribe(async () => {
      await this.getWorks();
      if (this.modalservice.getData() > 0)
        this.form.get('id_work').setValue((this.modalservice.getData()+""));
      else  this.form.get('id_work').setValue("");
    });
  }

  ngOnInit() {
    this.onChanges();
    this.getAmphurs();
    this.getWorks();
    setTimeout(() => this.MyResposible(), 1000);

  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
    this.subscr2.unsubscribe();
    this.subscr3.unsubscribe();
   // this.modalService.onHide.unsubscribe();
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
      id_responsible: ['']
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
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

    this.subscr3 = this.form.get('id_work').valueChanges
      .subscribe(work => {
        if (work == '0') {
          this.openModal();
        }
      });
  }

  openModal() {
    //console.log(this);
    this.modalRef = this.modalService.show(AddHeadWorkModalComponent);
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
      .then(works => {
        this.works = works
        this.works.push({
          id_work: 0,
          work: 'อื่นๆ',
          active: true
        })
      }
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
    this.form.get('id_responsible').reset("");
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

  onUpdateResponsible() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.responsible = this.form.value;

    //console.log(this.form.value);

    this.responsibleService.updateResponsible(this.responsible)
      .then(() => {
        this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info");
        this.onClearForm()
        this.MyResposible()
      })
      .catch(err => this.authen.checkMessage(err));
  }

  MyResposible() {
    this.responsibleService.getResponsible(this.account.UserLogin.id_user)
      .then(res => {
        if (res) {
          this.MyResponsible = res.map((res_: IResponsible) => {
            return {
              id_responsible: res_.id_responsible,
              r_id_user: res_.r_id_user,
              r_villagecode: res_.r_villagecode,
              r_villagecodefull: res_.r_villagecodefull,
              address: res_.address,
              id_work: res_.id_work,
              work: res_.work.work,
              villagename: res_.village.villagename,
              tambonname: res_.village.tambon.tambonname,
              ampurname: res_.village.tambon.amphur.ampurname,
              changwatname: res_.village.tambon.amphur.changwat.changwatname
            }
          });

          this.dataSource = new MatTableDataSource(this.MyResponsible);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = (data, filter: string) => {
            const accumulator = (currentTerm, key) => {
              return this.nestedFilterCheck(currentTerm, data, key);
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
          };
          //console.log(this.MyResponsible);
        }

      }).catch(err => {
        this.authen.checkMessage(err);
        this.dataSource = null;
      });
  }

  onEdit(responsible: IResponsible) {
    this.form.patchValue({
      amphur: responsible.r_villagecodefull.substr(0, 4),
      tambon: responsible.r_villagecodefull.substr(0, 6),
      r_villagecodefull: responsible.r_villagecodefull,
      r_villagecode: responsible.r_villagecode,
      id_work: responsible.id_work.toString(),
      r_id_user: this.account.UserLogin.id_user,
      address: responsible.address,
      id_responsible: responsible.id_responsible
    });



    this.flagEdit = true;
  }

  onDelete(responsible: IResponsible) {
    this.alert.confirm(`ต้องการลบงานที่รับผิดชอบนี้ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.responsibleService.deleteResponsible(responsible.id_responsible)
            .then(() => {
              this.MyResposible()
            }).catch(err => this.authen.checkMessage(err));
      })
  }

  onClearForm() {
    //this.disbleAll();
    this.form.get('id_responsible').reset("");
    this.flagEdit = false;
  }

  resultItem(hoscode: String) {
    this.form.get('hoscode').setValue(hoscode);
  }
}

