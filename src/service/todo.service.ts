import {CreateTODO} from "../types/todo.types";
import {db} from "../config/database";

export const createTodo = async (data: CreateTODO) => {
    const newTodo = await db.tODO.create({
        data: {
            title: data.title,
            description: data.description,
            userId: data.userId as number

        }
    })
    return {data: newTodo}
}