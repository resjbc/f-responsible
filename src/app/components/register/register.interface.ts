import { FormGroup } from '@angular/forms';

export interface IRegisterComponent {
    form: FormGroup;
    Url: any;
    onSubmit();
}

export interface IRegister {
    firstname: string,
    lastname: string,
    cid: string,
    username: string,
    password: string,
    id_position: string,
    cpassword: string,
    hoscode: string
}


