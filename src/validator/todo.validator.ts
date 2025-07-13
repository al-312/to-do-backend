import Joi from "joi";
import {TodoStatusEnum} from "../constants/enum";

export const createTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
})

export const updateTodoSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid(...Object.values(TodoStatusEnum)),
})