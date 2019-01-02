import { Component, OnInit } from '@angular/core';
declare const App;

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit {

  
  constructor() {
    
    
   }

  ngOnInit() {
    this.initailLoadUserlogin();
  }
  

  private initailLoadUserlogin() {
    return setTimeout(() => App.initialLoadPage(), 100);
  }

}
