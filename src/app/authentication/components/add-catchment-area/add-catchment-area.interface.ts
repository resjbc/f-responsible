import { IWorkItem } from '../../../shareds/components/listplace/listplace.interface';

export interface IResponsible {
    r_id_user: number;
    r_villagecode: string;
    r_villagecodefull: string;
    address?: string;
    id_work: number;
    date_created?: Date;
    date_updated?: Date;
    work?: { work: string };
    village?: {
        villagename: string;
        tambon: {
            tambonname: string;
            amphur: {
                ampurname: string;
                changwat: {
                    changwatname: string;
                }
            }
        }
    }
}
