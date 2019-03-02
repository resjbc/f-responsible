import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from './../../../shareds/services/alert.service';
import { AlllistService } from 'src/app/services/alllist.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IPositionItem } from 'src/app/components/login/login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthURL } from '../../authentication.url';
import { AppURL } from '../../../app.url';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

  position: IPositionItem = null;
  form: FormGroup;
  flagEdit: boolean = false;


  displayedColumns: string[] = ['id_position', 'position', 'edit', 'delete'];
  dataSource: MatTableDataSource<IPositionItem>;

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
    this.loadPositions();
    this.initialCreateFormData();
  }


  initialCreateFormData() {
    this.form = this.build.group({
      position: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      id_position: [null]
    });
  }

  loadPositions() {
    this.addlistService.getPositions_auth().then(positions => {
      this.dataSource = new MatTableDataSource(positions);
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

  onEdit(position) {
    this.form.patchValue(position);
    this.flagEdit = true;
  }

  onDelete(position) {
    this.alert.confirm(`ต้องการลบตำแหน่ง ${position.position} ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.addlistService.removePosition(position.id_position)
            .then(() => {
              this.loadPositions();
              this.onClearForm();
            }).catch(err => this.authen.checkMessage(err));
      })
  }

  onAddPosition() {
    if (this.form.invalid ) return this.alert.someting_wrong();
    this.position = this.form.value;
    this.position.active = true;
    this.addlistService.addPositions(this.position)
      .then(() => {
        this.alert.notify("เพิ่มหัวข้อตำแหน่งสำเร็จแล้ว", "info");
        this.onClearForm()
        this.loadPositions();
      })
      .catch(err => this.authen.checkMessage(err));

  }

  onUpdatePosition() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.position = this.form.value;
    this.addlistService.updatePositions(this.position)
      .then(() => {
        this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info");
        this.onClearForm()
        this.loadPositions();
      })
      .catch(err =>this.authen.checkMessage(err));
  }

  onClearForm() {
    this.form.reset();
    this.flagEdit = false;
  }

}
