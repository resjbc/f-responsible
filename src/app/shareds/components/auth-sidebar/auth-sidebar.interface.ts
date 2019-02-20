import { IAccount, ERoleAccount } from '../../../components/login/login.interface';

export interface IAuthSidebarComponent {
    AppURL: any;
    AuthURL: any;
    userLogin: IAccount
    Role: typeof ERoleAccount;
}