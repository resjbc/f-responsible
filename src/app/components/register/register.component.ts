import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Url = AppURL;

  constructor() { }

  ngOnInit() {
  }

}
