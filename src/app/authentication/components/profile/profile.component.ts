import { AlllistService } from './../../../services/alllist.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { AlertService } from '../../../shareds/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenService } from '../../../services/authen.service';
import { AccountService } from '../../../shareds/services/account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { IAccount, IPositionItem, ERoleAccount, ERoleAccountTH } from '../../../components/login/login.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  AppURL = AppURL;
  AuthURL = AuthURL;
  userLogin: IAccount = { role: 2 } as any;
  form: FormGroup;
  modalRef: BsModalRef;
  positions: IPositionItem[];

  constructor(
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService,
    private account: AccountService,
    private modalService: BsModalService,
    private alllists: AlllistService,
  ) { 
    this.initialCreateFormData();
    this.getListPositions();
  }

  ngOnInit() {
    this.account.getUserLogin(this.authen.getAuthenticated())
    .then(user => {
      this.userLogin = user;
      this.form.setValue({
        firstname: this.userLogin.firstname,
        lastname: this.userLogin.lastname,
        cid: this.userLogin.cid,
        id_user: this.userLogin.id_user,
        id_position: this.userLogin.position.id_position,
        hoscode: this.userLogin.hoscode,
        username: this.userLogin.username
      });


    }).catch(err => this.authen.checkMessage(err));

  }

  initialCreateFormData() {
    this.form = this.build.group({
      firstname: ['', [Validators.required, Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[ก-๏\sa-zA-Z]+$')]],
      cid: ['', [Validators.required, Validators.pattern("[0-9]{13,13}")]],
      id_position: ['', [Validators.required]],
      id_user: [null],
      hoscode: ['', [Validators.required]],
      username: ['', [Validators.required]]
    });
  }

  onResetForm() {
    this.form.setValue({
      firstname: this.account.UserLogin.firstname,
      lastname: this.account.UserLogin.lastname,
      cid: this.account.UserLogin.cid,
      id_user: this.account.UserLogin.id_user,
      id_position: this.account.UserLogin.position.id_position,
      hoscode: this.account.UserLogin.hoscode,
      username: this.account.UserLogin.username
    });
  }

  onUpdatePerson() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.userLogin = this.form.value;
    this.userLogin.role = this.account.UserLogin.role;
    this.account.onUpdateProfile( this.authen.getAuthenticated(),this.userLogin)
      .then(() =>
        this.account.getUserLogin(this.authen.getAuthenticated())
          .then(() => this.alert.notify("แก้ไขข้มูลสำเร็จแล้ว", "info"))
          .catch(err => this.alert.notify(err.Message))
      )
      .catch(err => this.authen.checkMessage(err));
  }

  openModal(template: TemplateRef<any>) {
    //console.log(this);
    this.modalRef = this.modalService.show(template);
  }

  getListPositions() {
    this.alllists
      .getPositions()
      .then(positions =>
        this.positions = positions
      )
      .catch(err =>
        this.authen.checkMessage(err));
  }

  getRoleName(role: ERoleAccount) {
    return ERoleAccountTH[role];
  }

  resultItem(hoscode: String) {
    this.form.get('hoscode').setValue(hoscode);
  }

}
