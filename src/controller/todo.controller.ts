import {Router} from "express";
import {IRequest, IResponse} from "../type";
import {createTodoSchema, updateTodoSchema} from "../validator/todo.validator";
import {validator} from "../middleware/vaildator";
import {createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo} from "../service/todo.service";
import {sendErrorResponse, sendSuccessResponse} from "../utils/baseResponse";

const router = Router()

router.delete("/:id", async (req: IRequest, res: IResponse) => {
    const id = req.params.id
    try {
        const deleteResult = await deleteTodo(id)
        sendSuccessResponse({response: res, statusCode: 200, message: "To Do list successfully.", data: deleteResult})
    } catch (err) {
        sendErrorResponse({response: res, statusCode: 500, message: "Error deleting user", data: err});
    }
})

router.get("/", async (req: IRequest, res: IResponse) => {
    const userId = req.user?.id;
    try {
        const data = await getAllTodos(userId!)
        sendSuccessResponse({response: res, statusCode: 200, message: "To Do list successfully.", data})
    } catch (err) {
        sendErrorResponse({response: res, data: err, message: "Error in getting To Do", statusCode: 500})
    }
})
router.get("/:id", async (req: IRequest, res: IResponse) => {
    if (req.params.id) {
    }
    const id = req.params.id
    const userId = req.user?.id;
    try {
        const data = await getTodoById(id, userId!)
        sendSuccessResponse({response: res, statusCode: 200, message: "To Do list successfully.", data})
    } catch (err) {
        sendErrorResponse({response: res, data: err, message: "Error in getting To Do", statusCode: 500})
    }
})

router.post("/", validator(createTodoSchema), async (req: IRequest, res: IResponse) => {
    const userId = req.user?.id;
    try {
        const data = await createTodo({...req.body, userId: userId})
        sendSuccessResponse({response: res, statusCode: 201, message: "To Do created successfully.", data})

    } catch (error) {
        sendErrorResponse({response: res, data: error, message: "Error in creating To Do", statusCode: 500})
    }
})
router.put("/:id", validator(updateTodoSchema), async (req: IRequest, res: IResponse) => {
    const userId = req.user?.id;
    const id = req.params.id;
    try {
        const data = await updateTodo(id, {...req.body, userId: userId})
        sendSuccessResponse({response: res, statusCode: 201, message: "To Do Updated successfully.", data})

    } catch (error) {
        sendErrorResponse({response: res, data: error, message: "Error in updating To Do", statusCode: 500})
    }
})


export default router