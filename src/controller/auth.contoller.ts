import {Router} from "express";
import {IRequest, IResponse} from "../type";
import {createUser} from "../service/user.service";
import {validator} from "../middleware/vaildator";
import {createUserSchema} from "../validator/user.vaildator";
import {sendErrorResponse, sendSuccessResponse} from "../utils/baseResponse";
import {userLoginSchema} from "../validator/auth.vaildator";
import {getUserById, loginWithEmailAndPassword} from "../service/auth.service";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router()

router.get("/", (req: IRequest, res: IResponse) => {
    res.json({"authenticated": true});
})

router.post("/register", validator(createUserSchema), async (req: IRequest, res: IResponse) => {
    try {
        const user = await createUser(req.body)
        sendSuccessResponse({response: res, data: user, statusCode: 201, message: "User created successfully."})

    } catch (err) {
        sendErrorResponse({response: res, statusCode: 500, message: "Error creating user", data: err});
    }
})

router.post("/login", validator(userLoginSchema), async (req: IRequest, res: IResponse) => {
    try {
        const data = await loginWithEmailAndPassword(req.body)
        sendSuccessResponse({response: res, data, statusCode: 200, message: "Login successful."})
    } catch (err) {
        sendErrorResponse({response: res, statusCode: 500, message: "Error in login", data: err});
    }
})

router.get("/profile", authMiddleware, async (req: IRequest, res: IResponse) => {
    try {
        if (!req.user) {
            return sendErrorResponse({response: res, statusCode: 401, message: "Unauthorized"});
        }
        const user = await getUserById(req.user.id)
        sendSuccessResponse({
            response: res,
            data: user,
            statusCode: 200,
            message: "User profile fetched successfully."
        });
    } catch (err) {
        sendErrorResponse({response: res, statusCode: 500, message: "Error fetching user profile", data: err});
    }
})


export default router