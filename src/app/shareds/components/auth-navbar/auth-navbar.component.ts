import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {
  AppURL = AppURL;
  

  constructor() { }

  ngOnInit() {
  }

}
