import express from 'express';
import authController from "./controller/auth.contoller"
import bodyParser from "body-parser";
import {authMiddleware} from "./middleware/auth.middleware";
import todoController from "./controller/todo.controller";
import {IRequest, IResponse} from "./type";


const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("views"))


app.use("/api/auth", authController)
app.use("/api/todo", authMiddleware, todoController)

app.get("/login", (req: IRequest, res: IResponse) => {
    res.render('login/index');

})
app.get("/todo", (req: IRequest, res: IResponse) => {
    res.render('todo/index',);

})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});