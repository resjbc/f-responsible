import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ModaldataService } from '../../../../shareds/services/modaldata.service';
import { ISearchresponsible } from '../search-responsibles.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-responsible-detail',
  templateUrl: './search-responsible-detail.component.html',
  styleUrls: ['./search-responsible-detail.component.css']
})
export class SearchResponsibleDetailComponent implements OnInit {

  responsibles: any;
  form: FormGroup;
  
  constructor(
    private _modalService: ModaldataService,
    private builder: FormBuilder
  ) { }

  @Input('modalRef') modalRef: BsModalRef;

  ngOnInit() {
    this.responsibles = this._modalService.getData();
    this.form = this.builder.group({
      name: [`${this.responsibles.firstname} ${this.responsibles.lastname}`, Validators.required],
      position: [this.responsibles.position, Validators.required],
      hospital: [this.responsibles.hosname, Validators.required],
      work: [this.responsibles.work, Validators.required],
      address: [`${this.responsibles.address} หมู่บ้าน ${this.responsibles.villagename} ตำบล ${this.responsibles.tambonname} อำเภอ ${this.responsibles.ampurname} จังหวัด ${this.responsibles.changwatname} 
      `, Validators.required]
    });
   // console.log(this.responsibles)
  }

}
