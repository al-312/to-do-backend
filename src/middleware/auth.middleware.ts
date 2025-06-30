import {INextFunction, IRequest, IResponse} from "../type";
import {sendErrorResponse} from "../utils/baseResponse";
import {verifyJwt} from "../utils/jwtHelper";

export const authMiddleware = (req:IRequest, res: IResponse, next:INextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return sendErrorResponse({response: res, statusCode: 401, message: "Unauthorized"});
    }
    try {
        req.user = verifyJwt(token);
        next()
    } catch (err) {
        return sendErrorResponse({response: res, statusCode: 401, message: "Invalid token", data: err});
    }
};