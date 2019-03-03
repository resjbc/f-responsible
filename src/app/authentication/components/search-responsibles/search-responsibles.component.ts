import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
import { ISearchresponsible } from './search-responsibles.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModaldataService } from '../../../../app/shareds/services/modaldata.service';

@Component({
  selector: 'app-search-responsibles',
  templateUrl: './search-responsibles.component.html',
  styleUrls: ['./search-responsibles.component.css']
})
export class SearchResponsiblesComponent implements OnInit {

  AppURL = AppURL;
  AuthURL = AuthURL;
  form: FormGroup;
  modalRef: BsModalRef;

  amphurs: IAmphurItem[];
  tambons: ITambonItem[];
  villages: IVillageItem[];

  responsibles: ISearchresponsible[];


  private subscr: Subscription;
  private subscr2: Subscription;
  private subscr3: Subscription;

  flagEdit: boolean = false;



  displayedColumns: string[] = ['id_responsible', 'firstname', 'lastname', 'hosname', 'work', 'detail'];
  dataSource: MatTableDataSource<ISearchresponsible>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private addlist: AlllistService,
    private modalService: BsModalService,
    private authen: AuthenService,
    private responsibleService: ResponsibleService,
    private _modalService: ModaldataService
  ) {
    this.initailCreateFormData();
  }

  ngOnInit() {
    this.onChanges();
    this.getAmphurs();
    //setTimeout(() => this.MyResposible(), 1000);
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
    this.subscr2.unsubscribe();
    this.subscr3.unsubscribe();
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
          //  this.form.get('tambon').disable();
          //  this.form.get('r_villagecodefull').disable();
        }
        else {
          this.resetAll();
          this.getTambons(amphur);
          this.SearchResposible(amphur);
        }

      });

    this.subscr2 = this.form.get('tambon').valueChanges
      .subscribe(tambon => {
        if (tambon == '') {
          // this.form.get('r_villagecodefull').disable();
        }
        else {
          this.SearchResposible(tambon);
          this.getvillages(tambon);
        }
      });

    this.subscr3 = this.form.get('r_villagecodefull').valueChanges
      .subscribe(r_village => {
        if (r_village == '') {

        }
        else {
          this.SearchResposible(r_village);
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


  SearchResposible(codeful: any) {
    this.responsibleService.getSearchResponsible(codeful)
      .then(res => {
        if (res) {
          this.responsibles = res.map((res_) => {

            return {
              address: res_.address,
              id_work: res_.id_work,
              r_villagecode: res_.r_villagecode,
              r_villagecodefull: res_.r_villagecodefull,
              firstname: res_.user.firstname,
              lastname: res_.user.lastname,
              position: res_.user.position.position,
              hosname: res_.user.hospital.hosname,
              villagename: res_.village.villagename,
              tambonname: res_.village.tambon.tambonname,
              ampurname: res_.village.tambon.amphur.ampurname,
              changwatname: res_.village.tambon.amphur.changwat.changwatname,
              work: res_.work.work
            }
          });

          this.dataSource = new MatTableDataSource(this.responsibles);
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

  onShowDetail(template: TemplateRef<any>, responsibles: ISearchresponsible) {
    this._modalService.setData(responsibles)
    this.modalRef = this.modalService.show(template);

  }


}
