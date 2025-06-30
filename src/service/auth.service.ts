import {UserLoginType} from "../types/auth.type";
import {db} from "../config/database";
import {comparePassword} from "../utils/auth.util";
import {jwtHelper} from "../utils/jwtHelper";

export const loginWithEmailAndPassword = async (data: UserLoginType) => {
    const user = await db.user.findUnique({where: {email: data.email}});
    if (!user) {
        throw "User not found"
    }
    const passwordCompare = await comparePassword(data.password, user.password);
    if (!passwordCompare) {
        throw "Invalid credentials"
    }
    const token = jwtHelper({email: user.email, id: user.id});
    return {accessToken: token};
}

export const getUserById = async (id: number) => {
    const user = await db.user.findUnique({
        where: {id}, select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            password: false,
        }
    });
    if (!user) {
        throw "User not found";
    }
    return user;
}