import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';
import { SearchResponsiblesComponent } from './components/search-responsibles/search-responsibles.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddHeadWorkComponent } from './components/add-head-work/add-head-work.component';
import { AddPositionComponent } from './components/add-position/add-position.component';

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
    { 
        path: AuthURL.ManagementUserComponent, 
        component: ManagementUserComponent 
    },
    { 
        path: AuthURL.ProfileComponent, 
        component: ProfileComponent 
    },
    { 
        path: AuthURL.AddHeadWorkComponent, 
        component: AddHeadWorkComponent 
    },
    { 
        path: AuthURL.AddPositionComponent, 
        component: AddPositionComponent 
    },
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)