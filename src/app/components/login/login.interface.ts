import { FormGroup } from "@angular/forms";

export interface ILoginComponent {
    Url: any;
    form: FormGroup;
    returnURL: string;
    onSubmit(): void;
}

export interface ILogin {
    username: string;
    password: string;
}


// ข้อมูลสมาชิก
export interface IAccount {
    id_user?: any;
    username?: string;
    password?: string;
    firstname: string;
    lastname: string;
    cid: string;
    hoscode: string;
    position?: IPositionItem;
    flag_active?: boolean;
    date_created?: Date;
    date_updated?: Date;
    role?: number;
}


export interface IPositionItem {
    id_position?: number,
    position: string,
    active?: boolean
}

// สิทธ์ผู้ใช้งาน
export enum ERoleAccount {
    Member = 1,
    Employee,
    Admin
}

export enum ERoleAccountTH {
    สมาชิก = 1,
    เจ้าหน้าที่,
    แอดมิน
}
