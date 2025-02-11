import { NextFunction, Request, Response } from 'express';
import { ErrorCode, UnauthorizedRole } from '../exeptions/exceptions.js';


interface User {
    name: string;
    email: string;
    password: string;
    role: 'ENGINEER' | 'WORKER' | 'MEDIC' | 'VISITOR' | 'OVERVIEWER'
    id: number;
    createdAt: Date;
    updatedAt: Date;
    salt: string;
}


export const overviewerAuthMiddleware = (req: Request, _res: Response, next: NextFunction)=>{
    
const user = (req as any).user as User
    if (user.role !== 'OVERVIEWER'){
        throw new UnauthorizedRole('Unauthorize role', ErrorCode.UNAUTHORIZED_ROLE)
    }
    next()
}



export const workerRoleAuthMiddleware = (req: Request, _res: Response, next: NextFunction)=>{
    
    const user = (req as any).user as User
        if (user.role !== 'OVERVIEWER'){
            throw new UnauthorizedRole('Unauthorize role', ErrorCode.UNAUTHORIZED_ROLE)
        }
        next()
    }
    
    

