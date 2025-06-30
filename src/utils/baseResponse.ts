import {IResponse} from "../type";

type BaseResponse = {
    response: IResponse;
    data?: unknown;
    message: string;
    statusCode: number;
}

type SentResponse = BaseResponse & { statusCode?: number, }

const sendResponse = ({response, message, statusCode, data = {}}: BaseResponse) => {
    response.status(statusCode).json({success: statusCode > 100 && statusCode < 300, message, data});
}

export const sendSuccessResponse = ({response, message, statusCode = 200, data}: SentResponse) => {
    sendResponse({response, message, statusCode, data});
}

export const sendErrorResponse = ({response, message, statusCode = 500, data}: SentResponse) => {
    sendResponse({response, message, statusCode, data});
}
