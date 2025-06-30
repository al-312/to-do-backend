import jwt, {JwtPayload} from 'jsonwebtoken';

interface IJwtPayload extends JwtPayload{
    id: number;
    email: string;
}

export const jwtHelper = (data: Record<string, unknown>)=>{
    const secretKey = process.env.JWT_SECRET as string;
    return jwt.sign(data, secretKey,{expiresIn: '1h'} );
}

export const verifyJwt = (token: string):IJwtPayload=>{
    const secretKey = process.env.JWT_SECRET as string;
    return jwt.verify(token, secretKey) as IJwtPayload;
}