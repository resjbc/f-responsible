import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';
import { SearchResponsiblesComponent } from './components/search-responsibles/search-responsibles.component';

const RouterList: Routes = [
    { path: '', redirectTo: AuthURL.AddCatchmentAreaComponent, pathMatch: 'full' },
    { 
        path: AuthURL.AddCatchmentAreaComponent, 
        component: AddCatchmentAreaComponent ,
    },
    { 
        path: AuthURL.SearchResponsiblesComponent, 
        component: SearchResponsiblesComponent ,
    },
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)