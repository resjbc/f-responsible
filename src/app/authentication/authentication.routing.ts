import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';

const RouterList: Routes = [
    { path: '', redirectTo: AuthURL.AddCatchmentAreaComponent, pathMatch: 'full' },
    { 
        path: AuthURL.AddCatchmentAreaComponent, 
        component: AddCatchmentAreaComponent ,
    },
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)