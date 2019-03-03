import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './authentication.url';
import { AddCatchmentAreaComponent } from './components/add-catchment-area/add-catchment-area.component';
import { SearchResponsiblesComponent } from './components/search-responsibles/search-responsibles.component';
import { ManagementUserComponent } from './components/management-user/management-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddHeadWorkComponent } from './components/add-head-work/add-head-work.component';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { ERoleAccount } from '../components/login/login.interface';
import { UserRoleGuard } from '../guards/user-role.guard';

const RouterList: Routes = [
    { path: '', redirectTo: AuthURL.AddCatchmentAreaComponent, pathMatch: 'full' },
    {
        path: AuthURL.AddCatchmentAreaComponent,
        component: AddCatchmentAreaComponent,
        canActivate: [UserRoleGuard] ,
        data: { roles: [ERoleAccount.Member, ERoleAccount.Admin] }
    },
    {
        path: AuthURL.SearchResponsiblesComponent,
        component: SearchResponsiblesComponent,
        canActivate: [UserRoleGuard] ,
        data: { roles: [ERoleAccount.Employee, ERoleAccount.Admin] }
    },
    {
        path: AuthURL.ManagementUserComponent,
        component: ManagementUserComponent,
        canActivate: [UserRoleGuard] ,
        data: { roles: [ERoleAccount.Admin] }
    },
    {
        path: AuthURL.ProfileComponent,
        component: ProfileComponent
    },
    {
        path: AuthURL.AddHeadWorkComponent,
        component: AddHeadWorkComponent,
        canActivate: [UserRoleGuard] ,
        data: { roles: [ERoleAccount.Employee, ERoleAccount.Admin] }
    },
    {
        path: AuthURL.AddPositionComponent,
        component: AddPositionComponent,
        canActivate: [UserRoleGuard] ,
        data: { roles: [ERoleAccount.Employee, ERoleAccount.Admin] }
    },
];

export const AuthenticationRouting = RouterModule.forChild(RouterList)