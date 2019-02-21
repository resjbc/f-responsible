import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AlllistService } from 'src/app/services/alllist.service';
import { IAddItemComponent, IAmphurItem, IHospitalItem } from './listplace.interface';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listplace',
  templateUrl: './listplace.component.html',
  styleUrls: ['./listplace.component.css'],
  providers: [AlllistService]
})
export class ListplaceComponent implements OnInit ,OnDestroy,IAddItemComponent{

  

  @Input('modalRef') modalRef: BsModalRef;
  @Output('hoscode') hoscode: EventEmitter<String> = new EventEmitter();
  
  form: FormGroup;

  private subscr: Subscription;
  private subscr2: Subscription;

  amphurs: IAmphurItem[];
  hospitals: IHospitalItem[];

  onSubmit(): void {
    this.hoscode.emit(this.form.get('hospital').value);
    this.modalRef.hide();
  }

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private addlist: AlllistService,
  ) {
    this.initailCreateFormData();
   }

  ngOnInit() {
    this.onChanges();
    this.getAmphurs();
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
    this.subscr2.unsubscribe();
  }

  private initailCreateFormData() {
    this.form = this.builder.group({
      amphur: ['', Validators.required],
      hospital: ['', Validators.required]
    });
  }

  onChanges() {
    this.form.get('hospital').disable();
    this.subscr = this.form.get('amphur').valueChanges
      .subscribe(amphur => {
        if (amphur == '') {
          //this.form.get('type').reset();
          this.form.get('hospital').disable();
        }
        else {
          this.getHospitals(amphur);
          this.form.get('hospital').enable();
        }
      });


      this.subscr2 =  this.form.get('hospital').valueChanges
      .subscribe(hospital => {
        if (hospital == '') {
          console.log("Disble Button");
        }
        else {
          console.log(hospital);
        }
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

  getHospitals(amphur) {
    this.addlist
      .getHospitals({amphurcode:amphur , changwatcode:"94"})
      .then(hospitals =>
        this.hospitals = hospitals
      )
      .catch(err =>
        this.alert.notify(err.Message));
  }






}
