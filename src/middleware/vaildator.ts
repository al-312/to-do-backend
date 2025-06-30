import Joi from "joi";
import {INextFunction, IRequest, IResponse} from "../type";
import {sendErrorResponse} from "../utils/baseResponse";

export const validator = (schema: Joi.ObjectSchema<any>) => {
    return (req: IRequest, res: IResponse, next: INextFunction) => {
        if (!req.body) {
            return sendErrorResponse({response: res, statusCode: 400, message: "Validation error"});

        }
        const {error, value} = schema.validate(req.body, {abortEarly: false, stripUnknown: true});
        if (error) {
            return sendErrorResponse({response: res, statusCode: 400, message: "Validation error", data: error});
        }
        req.body = value;
        next();
    }
}