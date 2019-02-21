import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlllistService } from 'src/app/services/alllist.service';
import { IAddItemComponent, IAmphurItem, IHospitalItem } from './listplace.interface';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-listplace',
  templateUrl: './listplace.component.html',
  styleUrls: ['./listplace.component.css'],
  providers: [AlllistService]
})
export class ListplaceComponent implements OnInit ,IAddItemComponent{

  @Input('modalRef') modalRef: BsModalRef;
  @Output('listitem') listitem: EventEmitter<String> = new EventEmitter();
  
  form: FormGroup;

  amphurs: IAmphurItem[];
  hospitals: IHospitalItem[];

  onSubmit(): void {
 
  }

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private addlist: AlllistService,
  ) {
    this.initailCreateFormData();
   }

  ngOnInit() {
  }

  private initailCreateFormData() {
    this.form = this.builder.group({
      amphur: ['', Validators.required],
      hospital: ['', Validators.required]
    });
  }

  getAmphurs() {
    this.addlist
      .getAmphurs()
      .then(amphurs =>
        this.amphurs = amphurs
      )
      .catch(err =>
        this.alert.notify(err.Message));
  }



}
