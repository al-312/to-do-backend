import {TodoStatusEnum} from "../constants/enum";

export type CreateTODO = {
    title: string,
    description?: string,
    status: TodoStatusEnum,
    userId?: number

}

export type UpdateTODO = {
    title?: string,
    description?: string,
    status?: TodoStatusEnum,
    userId: number
}