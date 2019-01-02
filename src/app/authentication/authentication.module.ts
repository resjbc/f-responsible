import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';
import { AuthenticationRouting } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';

@NgModule({
  declarations: [AddCatchmentAreaComponent],
  imports: [
    CommonModule,
    AuthenticationRouting,
    SharedsModule
  ]
})
export class AuthenticationModule { }
