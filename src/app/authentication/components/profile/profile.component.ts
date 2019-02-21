import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { AlertService } from '../../../shareds/services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenService } from '../../../services/authen.service';
import { AccountService } from '../../../shareds/services/account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { IAccount } from '../../../components/login/login.interface';

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

  constructor(
    private alert: AlertService,
    private build: FormBuilder,
    private authen: AuthenService,
    private account: AccountService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
   /* this.account.getUserLogin(this.authen.getAuthenticated())
    .then(user => {
      this.userLogin = user;
      this.form.setValue({
        firstname: this.userLogin.firstname,
        lastname: this.userLogin.lastname,
        cid: this.userLogin.cid,
        id_user: this.userLogin.id_user,
      });

    }).catch(err => this.alert.notify(err.Message));*/

  }

  openModal(template: TemplateRef<any>) {
    //console.log(this);
    this.modalRef = this.modalService.show(template);
  }

}
