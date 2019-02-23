import { AuthenService } from './../../../../services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { ValidatorsService } from './../../../../shareds/services/validators.service';
import { AlertService } from './../../../../shareds/services/alert.service';
import { Component, OnInit, Input } from '@angular/core';
import { IChangePasswordComponent } from './change-password.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements IChangePasswordComponent {

  constructor(
	  private builder: FormBuilder,
	  private alert: AlertService,
    private validator: ValidatorsService,
    private account: AccountService,
    private authen: AuthenService
  ) { 
	  this.initailCreateFormData();
  }

  @Input('modalRef') modalRef: BsModalRef;
  form: FormGroup;


  //เปลี่ยนรหัสผ่าน
  onSubmit() {
	  if(this.form.invalid)
      return this.alert.someting_wrong();
    this.account
        .onChangePassword(this.authen.getAuthenticated(), this.form.value)
        .then(user => {
          this.alert.notify('เปลี่ยนรหัสผ่านสำเร็จ', 'info');
          this.modalRef.hide();
          //console.log(user);
        })
        .catch(err => this.alert.notify(err.Message));
	
  }
  
  // สร้ามฟอร์ม
  private initailCreateFormData() {
	  this.form = this.builder.group({
		  old_pass: ['', [Validators.required]],
		  new_pass: ['', [Validators.required, this.validator.isPassword]],
		  cnew_pass: ['', [Validators.required, this.validator.comparePassword('new_pass')]]
	  });
  }


}
