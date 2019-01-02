import { Component, OnInit } from '@angular/core';
import { AppURL } from './app.url';
import { AuthURL } from './authentication/authentication.url';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  AppURL = AppURL;
  AuthURL = AuthURL;
  title = 'Responsible';

  ngOnInit(): void {

  }
}


