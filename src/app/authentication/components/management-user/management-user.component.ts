import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlllistService } from 'src/app/services/alllist.service';
import { ERoleAccountTH, IPositionItem } from './../../../components/login/login.interface';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMember } from './member.interface';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { AlertService } from '../../../shareds/services/alert.service';
import { AuthenService } from '../../../services/authen.service';
import { MemberService } from '../../services/member.service';
import { ERoleAccount } from 'src/app/components/login/login.interface';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css']
})
export class ManagementUserComponent implements OnInit {


  form: FormGroup;
  member: IMember = null;
  flagEdit: boolean = false;
  modalRef: BsModalRef;


  displayedColumns: string[] = ['cid', 'firstname', 'lastname', 'role', 'edit', 'delete'];
  dataSource: MatTableDataSource<IMember>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;

  roleItem: ERoleAccountTH[] = [
    ERoleAccountTH.สมาชิก,
    ERoleAccountTH.เจ้าหน้าที่,
    ERoleAccountTH.แอดมิน
  ];

  positions: IPositionItem[];

  constructor(
    private memberService: MemberService,
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService,
    private alllists: AlllistService,
    private modalService: BsModalService
  ) {

  }

  ngOnInit() {
    this.initialCreateFormData();
    this.loadMembers();
    this.getListPositions();
  }

  onSubmit() {
  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      lastname: ['', [Validators.required,Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      cid: ['', [Validators.required,Validators.pattern("[0-9]{13,13}")]],
      id_position: ['',Validators.required],
      hoscode: ['',[Validators.pattern("[0-9]{5,5}")]],
      username: [''],
      password: [''],
      role: ["",Validators.required],
      id_user: [null]
    });
  }

  getListPositions() {
    this.alllists
      .getPositions_auth()
      .then(positions =>
        this.positions = positions
      )
      .catch(err =>
        this.authen.checkMessage(err));
  }

  loadMembers() {
    this.memberService.getMembers().then(members => {
      members = members.map( member => {
        member.role_string = ERoleAccountTH[member.role].toString();
        return member;
      })
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
      .catch(err => this.authen.checkMessage(err));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(member) {
    this.form.patchValue(member);
    this.flagEdit = true;
  }

  onDelete(member) {
    this.alert.confirm(`ต้องการลบคุณ ${member.firstname} ${member.lastname} ใช่หรือไม่`)
      .then(status => {
        if (status)
          this.memberService.removeMember(member.id_user)
            .then(() => {
              this.loadMembers();
              this.onClearForm();
            }).catch(err => this.authen.checkMessage(err));
      })
  }

  onAddMember() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.member = this.form.value;
    this.member.role = 1;
    this.memberService.addMember(this.member)
        .then(() => {
          this.alert.notify("เพิ่มผู้ประกอบการสำเร็จแล้ว","info");
          this.onClearForm();
          this.loadMembers();
        })
        .catch(err => this.authen.checkMessage(err));
    
  }

  onUpdateMember() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.member = this.form.value;
    //this.member.role = 1;
    console.log(this.member)
    this.memberService.updateMember(this.member)
        .then(() => {
          this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว","info");
          this.onClearForm()
          this.loadMembers();
        })
        .catch(err => this.authen.checkMessage(err));
  }

  onClearForm() {
    this.form.reset();
    this.form.get('id_position').setValue("");
    this.form.get('role').setValue("");
    this.flagEdit = false;
  }

  getRoleName(role: ERoleAccountTH) {
    return ERoleAccountTH[role];
  }

  resultItem(hoscode: String) {
    this.form.get('hoscode').setValue(hoscode);
  }

  openModal(template: TemplateRef<any>) {
    //console.log(this);
    this.modalRef = this.modalService.show(template);
  }
}
