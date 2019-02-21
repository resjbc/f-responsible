import { ERoleAccount } from '../../../components/login/login.interface';
import { FormGroup } from '@angular/forms';

export interface IMember {
    id_user?: string;
    username?: string;
    password?: string;
    firstname: string;
    lastname: string;
    cid: string;
    hoscode: string;
    id_position: number;
    flag_active?: boolean;
    date_created?: Date;
    date_updated?: Date;
    role?: number;
    
}

export interface ICreateMemberComponent {
    form: FormGroup;
    onSubmit(): void;
    member: IMember;
}
