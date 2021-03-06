import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppURL } from '../../app.url';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert.service';
import { AccountService } from '../../shareds/services/account.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../shareds/services/validators.service';
import { AlllistService } from '../../../app/services/alllist.service';
import { IPositionItem } from '../login/login.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Url = AppURL;
  form: FormGroup;
  modalRef: BsModalRef;

  positions: IPositionItem[];

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,
    private validator: ValidatorsService,
    private alllists: AlllistService,
    private modalService: BsModalService,
  ) {
    this.initialCreateFormData();
  }

  ngOnInit() {
    this.getListPositions();
  }

  openModal(templete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templete, { class: 'modal-lg' });
  }

  private initialCreateFormData() {
    //สร้ามฟอร์ม
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      cid: ['', [Validators.required, this.validator.validateIdCard,Validators.pattern("[0-9]{13,13}")]],
      password: ['', [Validators.required, this.validator.isPassword,]],
      cpassword: ['', [Validators.required, this.validator.comparePassword('password')]],
      id_position: ['', [Validators.required]],
      hoscode: ['', [Validators.required]]
    });
  }

  //ลงทะเบียน
  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();


    this.account
      .onRegister(this.form.value)
      .then(res => {
        this.router.navigate(['/', AppURL.Login]);
        this.alert.notify('ลงทะเบียนสำเร็จแล้ว', 'info');
      })
      .catch(err => this.alert.notify(err.Message));

  }

  getListPositions() {
    this.alllists
      .getPositions()
      .then(positions =>
        this.positions = positions
      )
      .catch(err =>
        this.alert.notify(err.Message));
  }

  resultItem(hoscode: String) {
    this.form.get('hoscode').setValue(hoscode);
  }



}
