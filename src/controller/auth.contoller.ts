import {Router} from "express";
import {IRequest, IResponse} from "../type";
import {createUser} from "../service/user.service";
import {validator} from "../middleware/vaildator";
import {createUserSchema} from "../validator/auth.vaildator";
import {sendErrorResponse, sendSuccessResponse} from "../utils/baseResponse";

const router = Router()

router.get("/", (req: IRequest, res: IResponse) => {
    res.json({"authenticated": true});
})

router.post("/", validator(createUserSchema), async (req: IRequest, res: IResponse)=>{
    try{
        const user = await createUser(req.body)
        sendSuccessResponse({response:res, data: user, statusCode:201, message:"User created successfully."})

    }catch(err){
        sendErrorResponse({response:res, statusCode:500, message:"Error creating user", data: err});
    }
})

export default router