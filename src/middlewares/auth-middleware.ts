import { NextFunction, Request, Response } from 'express';
import { ErrorCode, UnauthorizedException } from '../exeptions/root-HttpException.js';
import { paikyJWTVerify } from '../utils/jwt.js';

export const authMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers.authorization

    //$ We are already checking for a missing token at the validation but we do it twice just to make sure:
    if(!token){
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        return
    }
    //$ This is my custom HMAC function. If it is successful it will return a user id, if it's not it will return "null".
    const userId = paikyJWTVerify(token, process.env.SECRET!)
    if(!userId){
        throw new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED)
    }
    (req as any).body.userId = userId
    next()
}

export default authMiddleware