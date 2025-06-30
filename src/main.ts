import express, { Request, Response } from 'express';
import authController from "./controller/auth.contoller"
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth", authController)

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, TypeScript Express!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});