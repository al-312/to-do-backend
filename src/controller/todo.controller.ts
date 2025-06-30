import {Router} from "express";
import {IRequest, IResponse} from "../type";
import {createTodoSchema} from "../validator/todo.validator";
import {validator} from "../middleware/vaildator";
import {createTodo} from "../service/todo.service";
import {sendErrorResponse, sendSuccessResponse} from "../utils/baseResponse";

const router = Router()

router.post("/", validator(createTodoSchema), async (req: IRequest, res: IResponse) => {
    const userId = req.user?.id;
    try {
        const data = await createTodo({...req.body, userId: userId})
        sendSuccessResponse({response: res, statusCode: 201, message: "To Do created successfully.", data})

    } catch (error) {
        sendErrorResponse({response: res, data: error, message: "Error in creating To Do", statusCode: 500})
    }
})


export default router