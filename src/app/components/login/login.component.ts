import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Url = AppURL;
  
  constructor() { }

  ngOnInit() {
  }

}
