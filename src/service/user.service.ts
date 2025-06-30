import {CreateUserTYpe} from "../types/user.type";
import {db} from "../config/database";
import {hashPassword} from "../utils/auth.util";

export const createUser = async (data: CreateUserTYpe) => {
    console.log(data)
    const existingUser = await db.user.findUnique({where: {email: data.email}});
    if (existingUser) {
        throw "User with email already exist";
    }
    const user = await db.user.create({
        data: {...data, password:hashPassword(data.password)},
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
        },
    });
    console.log(user)
    return user;

}