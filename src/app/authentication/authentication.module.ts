import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { SearchResponsiblesComponent } from './components/search-responsibles/search-responsibles.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { SearchResponsibleDetailComponent } from './components/search-responsibles/search-responsible-detail/search-responsible-detail.component';
import { AddHeadWorkComponent } from './components/add-head-work/add-head-work.component';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { AddHeadWorkModalComponent } from './components/add-catchment-area/add-head-work-modal/add-head-work-modal.component';

@NgModule({
  declarations: 
  [
    AddCatchmentAreaComponent, 
    ProfileComponent, 
    ChangePasswordComponent, 
    SearchResponsiblesComponent, 
    ManagementUserComponent, SearchResponsibleDetailComponent, AddHeadWorkComponent, AddPositionComponent, AddHeadWorkModalComponent
  ],
  imports: 
  [
    CommonModule,
    AuthenticationRouting,
    SharedsModule
  ],
  exports:
  [
    AddHeadWorkModalComponent
  ],
  entryComponents: [AddHeadWorkModalComponent],
})
export class AuthenticationModule { }
