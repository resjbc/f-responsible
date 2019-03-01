import { Component, OnInit, ViewChild } from '@angular/core';
import { IWorkItem } from '../../../shareds/components/listplace/listplace.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { AuthenService } from '../../../services/authen.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { AlllistService } from '../../../services/alllist.service';

@Component({
  selector: 'app-add-head-work',
  templateUrl: './add-head-work.component.html',
  styleUrls: ['./add-head-work.component.css']
})
export class AddHeadWorkComponent implements OnInit {

  work: IWorkItem = null;
  form: FormGroup;
  flagEdit: boolean = false;


  displayedColumns: string[] = ['id_work', 'work', 'edit', 'delete'];
  dataSource: MatTableDataSource<IWorkItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;



  constructor(
    private addlistService: AlllistService,
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService
  ) {

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.loadWorks();
    this.initialCreateFormData();
  }


  initialCreateFormData() {
    this.form = this.build.group({
      work: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      id_work: [null]
    });
  }

  loadWorks() {
    this.addlistService.getWorks().then(works => {
      this.dataSource = new MatTableDataSource(works);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
      .catch(err => {
        this.authen.checkMessage(err);
        this.dataSource = null;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(work) {
    this.form.patchValue(work);
    this.flagEdit = true;
  }

  onDelete(work) {
    this.alert.confirm(`ต้องการลบ พรบ ${work.work} ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.addlistService.removeWork(work.id_work)
            .then(() => {
              this.loadWorks();
              this.onClearForm();
            }).catch(err => this.authen.checkMessage(err));
      })
  }

  onAddWork() {
    if (this.form.invalid ) return this.alert.someting_wrong();
    this.work = this.form.value;
    this.work.active = true;
    this.addlistService.addWorks(this.work)
      .then(() => {
        this.alert.notify("เพิ่มหัวข้องานสำเร็จแล้ว", "info");
        this.onClearForm()
        this.loadWorks();
      })
      .catch(err => this.authen.checkMessage(err));

  }

  onUpdateWork() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.work = this.form.value;
    this.addlistService.updateWorks(this.work)
      .then(() => {
        this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info");
        this.onClearForm()
        this.loadWorks();
      })
      .catch(err =>this.authen.checkMessage(err));
  }

  onClearForm() {
    this.form.reset();
    this.flagEdit = false;
  }

}
