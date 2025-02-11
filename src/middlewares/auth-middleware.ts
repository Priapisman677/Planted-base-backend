import { NextFunction, Request, Response } from 'express';
import { ErrorCode, UnauthorizedException } from '../exeptions/exceptions.js';
import { paikyJWTVerify } from '../utils/crypto/jwt.js';
import { prisma } from '../routes/app-setup.js';

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction)=>{

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

    const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});
    
    if(!user){
        throw new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED)
    }

    (req as any).user = user
    next()
}

export default authMiddleware