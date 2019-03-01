import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMember } from './member.interface';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { AlertService } from '../../../shareds/services/alert.service';
import { AuthenService } from '../../../services/authen.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css']
})
export class ManagementUserComponent implements OnInit {


  form: FormGroup;
  person: IMember = null;
  flagEdit: boolean = false;


  displayedColumns: string[] = ['cid', 'firstname', 'lastname', 'mobile', 'edit', 'delete'];
  dataSource: MatTableDataSource<IMember>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;



  constructor(
    private personService: MemberService,
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService
  ) {

  }

  ngOnInit() {
    this.loadPersons();
    this.initialCreateFormData();
  }

  onSubmit() {
  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      lastname: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      cid: ['', [Validators.required,Validators.pattern("[0-9]{13,13}")]],
      address: [''],
      mobile: ['',[Validators.pattern("[0-9]{8,10}")]],
      username: [''],
      password: [''],
      role: [1],
      id_person: [null]
    });
  }

  loadPersons() {
    this.personService.getPersons(this.authen.getAuthenticated()).then(person => {
      this.dataSource = new MatTableDataSource(person);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
      .catch(err => this.alert.notify(err.Message));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(person) {
    this.form.patchValue(person);
    this.flagEdit = true;
  }

  onDelete(person) {
    this.alert.confirm(`ต้องการลบคุณ ${person.firstname} ${person.lastname} ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.personService.removePerson(person.id_person,this.authen.getAuthenticated())
            .then(() => {
              this.loadPersons();
              this.onClearForm();
            }).catch(err => this.alert.notify(err.Message));
      })
  }

  onAddPerson() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.person = this.form.value;
    this.person.role = 1;
    this.personService.addPerson(this.person,this.authen.getAuthenticated())
        .then(() => {
          this.alert.notify("เพิ่มผู้ประกอบการสำเร็จแล้ว","info");
          this.onClearForm();
          this.loadPersons();
        })
        .catch(err => this.alert.notify(err.Message));
    
  }

  onUpdatePerson() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.person = this.form.value;
    this.person.role = 1;
    this.personService.addPerson(this.person,this.authen.getAuthenticated())
        .then(() => {
          this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว","info");
          this.onClearForm()
          this.loadPersons();
        })
        .catch(err => this.alert.notify(err.Message));
  }

  onClearForm() {
    this.form.reset();
    this.flagEdit = false;
  }

}
