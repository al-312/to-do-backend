import express, { Request, Response } from 'express';
import authController from "./controller/auth.contoller"
import bodyParser from "body-parser";
import {authMiddleware} from "./middleware/auth.middleware";
import todoController from "./controller/todo.controller";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth", authController)
app.use("/todo",authMiddleware, todoController)

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, TypeScript Express!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});