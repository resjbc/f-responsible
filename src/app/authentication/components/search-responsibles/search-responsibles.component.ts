import { Component, OnInit, ViewChild } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAmphurItem, ITambonItem, IVillageItem, IWorkItem } from '../../../shareds/components/listplace/listplace.interface';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AlertService } from '../../../shareds/services/alert.service';
import { AlllistService } from '../../../services/alllist.service';
import { AccountService } from '../../../shareds/services/account.service';
import { AuthenService } from '../../../services/authen.service';
import { ResponsibleService } from '../../services/responsible.service';

@Component({
  selector: 'app-search-responsibles',
  templateUrl: './search-responsibles.component.html',
  styleUrls: ['./search-responsibles.component.css']
})
export class SearchResponsiblesComponent implements OnInit {

  AppURL = AppURL;
  AuthURL = AuthURL;
  form: FormGroup;

  amphurs: IAmphurItem[];
  tambons: ITambonItem[];
  villages: IVillageItem[];
  works: IWorkItem[];

  responsible: IResponsible = {} as IResponsible;
  MyResponsible: IMyresponsible[];


  private subscr: Subscription;
  private subscr2: Subscription;

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
    private authen: AuthenService,
    private responsibleService: ResponsibleService

  ) {
    this.initailCreateFormData();
  }

  ngOnInit() {
    this.onChanges();
    this.getAmphurs();
    this.getWorks();
    //setTimeout(() => this.MyResposible(), 1000);
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
    this.subscr2.unsubscribe();
  }

  private initailCreateFormData() {
    this.form = this.builder.group({
      amphur: ['', Validators.required],
      tambon: ['', Validators.required],
      r_villagecodefull: ['', Validators.required]
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
        }
        else {
          this.resetAll();
          
          this.getTambons(amphur);
        }

      });

    this.subscr2 = this.form.get('tambon').valueChanges
      .subscribe(tambon => {
        if (tambon == '') {

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

  onUpdateResponsible(){
    if (this.form.invalid) return this.alert.someting_wrong();
    this.responsible = this.form.value;

    console.log(this.form.value);
    
    this.responsibleService.updateResponsible(this.responsible)
      .then(() => {
        this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info");
        this.onClearForm()
        this.MyResposible()
      })
      .catch(err =>  this.authen.checkMessage(err));
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
      id_responsible : responsible.id_responsible
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
             }).catch(err =>  this.authen.checkMessage(err));
       })
  }

  onClearForm() {
    //this.disbleAll();
    this.form.get('id_responsible').reset("");
    this.flagEdit = false;
  }

}
