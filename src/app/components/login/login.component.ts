import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shareds/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AuthURL } from 'src/app/authentication/authentication.url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,ILoginComponent {

  form: FormGroup;
  returnURL: string;
  

  Url = AppURL;
  
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService,
    private activateRoute: ActivatedRoute
  ) { 
    this.activateRoute.params.forEach(param =>
      this.returnURL = param.returnURL || `/${AppURL.Authen}/${AuthURL.AddCatchmentAreaComponent}`
    )
    this.initaiilCreateFormData();
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.form.invalid)
      return this.alert.someting_wrong();
    this.account.onLogin(this.form.value)
      .then(res => {
        this.authen.setAuthenticated(res.accessToken);
        this.alert.notify("เข้าสู่ระบบสำเร็จแล้ว", "info")
        this.router.navigateByUrl(this.returnURL);
      })
      .catch(err => this.alert.notify(err.Message));

  }

  private initaiilCreateFormData() {
    this.form = this.builder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

}
