import {STATUS} from "../constants/enum";

export type CreateTODO = {
    title: string,
    description?: string,
    status: STATUS,
    userId?: string

}