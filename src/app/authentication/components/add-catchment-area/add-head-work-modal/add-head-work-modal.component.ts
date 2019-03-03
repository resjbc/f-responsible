import { ModaldataService } from './../../../../shareds/services/modaldata.service';
import { IWorkItem } from './../../../../shareds/components/listplace/listplace.interface';
import { AlllistService } from 'src/app/services/alllist.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from './../../../../shareds/services/alert.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-head-work-modal',
  templateUrl: './add-head-work-modal.component.html',
  styleUrls: ['./add-head-work-modal.component.css']
})
export class AddHeadWorkModalComponent {

  new_work_: IWorkItem;

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private addlist: AlllistService,
    private account: AccountService,
    private authen: AuthenService,
    public modalRef: BsModalRef,
    public modalservice :ModaldataService
  ) {
    this.initailCreateFormData();
  }

    form: FormGroup;


  onSubmit() {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.new_work_ = this.form.value;
    this.addlist
      .addWorks(this.new_work_)
      .then(new_work => {
        if (new_work) {
          this.alert.notify('เพิ่มหัวข้องานสำเร็จแล้ว', 'info');
          this.modalservice.setData(new_work.id_work);
          this.modalRef.hide();
        } else 
        this.modalservice.setData(0);
        //console.log(user);
      })
      .catch(err => this.authen.checkMessage(err));

  }

  // สร้ามฟอร์ม
  private initailCreateFormData() {
    this.form = this.builder.group({
      work: ['', [Validators.required]],
    });
  }


}
