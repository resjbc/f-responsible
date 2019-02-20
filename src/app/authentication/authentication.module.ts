import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { CreateMemberComponent } from './components/create-member/create-member.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';

@NgModule({
  declarations: [AddCatchmentAreaComponent, CreateMemberComponent, ProfileComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedsModule
  ]
})
export class AuthenticationModule { }
