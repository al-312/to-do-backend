import Joi from "joi";

export const createTodoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
})