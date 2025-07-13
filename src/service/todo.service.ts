import {CreateTODO, UpdateTODO} from "../types/todo.types";
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

export const deleteTodo = async (id: string) => {
    return db.tODO.delete({where: {id: parseInt(id)}});
}

export const getAllTodos = async (userId: number) => {
    return db.tODO.findMany({where: {userId}});
}

export const getTodoById = async (id: string, userId:number) => {
    return db.tODO.findUnique({where: {id: parseInt(id), userId}});
}

export const updateTodo = async (id: string, updateData: UpdateTODO) => {
    const toDo = db.tODO.findUnique({where: {id: parseInt(id)}});
    if(!toDo){
        throw "invalid ToDo data"
    }
    return db.tODO.update({where: {id: parseInt(id)}, data: updateData})
}