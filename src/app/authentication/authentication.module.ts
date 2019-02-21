import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { SearchResponsiblesComponent } from './components/search-responsibles/search-responsibles.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';

@NgModule({
  declarations: 
  [
    AddCatchmentAreaComponent, 
    ProfileComponent, 
    ChangePasswordComponent, 
    SearchResponsiblesComponent, 
    ManagementUserComponent
  ],
  imports: 
  [
    CommonModule,
    AuthenticationRouting,
    SharedsModule
  ]
})
export class AuthenticationModule { }
