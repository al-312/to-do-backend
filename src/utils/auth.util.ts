import bcrypt from "bcrypt"

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 12);
}
export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}
