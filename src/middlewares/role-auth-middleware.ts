import { NextFunction, Request, Response } from 'express';
import { ErrorCode, UnauthorizedRole } from '../exeptions/exceptions.js';

export interface User {
	name: string;
	email: string;
	password: string;
	role: 'ENGINEER' | 'WORKER' | 'MEDIC' | 'VISITOR' | 'OVERVIEWER';
    accesTo: string[];
	id: number;
	createdAt: Date;
	updatedAt: Date;
	salt: string;
}

//prettier-ignore
export const overviewerAuthMiddleware = (req: Request, _res: Response, next: NextFunction)=>{
	const user = (req as any).user as User;
	if (user.role !== 'OVERVIEWER') {
        //prettier-ignore
		throw new UnauthorizedRole('Unauthorize role',ErrorCode.UNAUTHORIZED_ROLE);
	}
	next();
};


//prettier-ignore
export const workerRoleAuthMiddleware = (req: Request, _res: Response, next: NextFunction)=>{
	const user = (req as any).user as User;

    
    // Here’s a simple role-to-tag relationship based on the item tags:

    // Engineer → Equipment, Electronics, Energy
    // Worker → Resource, Consumable
    // Medic → Consumable (specifically for medical-related items like Medical Supplies)

    if (user.role === 'ENGINEER') {
        (req as any).user.accesTo = ['equipment', 'electronics', 'energy'];
    }

    if (user.role === 'WORKER') {
        (req as any).user.accesTo = ['resource', 'consumable'];
    }

    if (user.role === 'MEDIC') {
        (req as any).user.accesTo = ['consumable'];
    }

    if (user.role === 'VISITOR') {
        (req as any).user.accesTo = [];
    }
    if(user.role === 'OVERVIEWER'){
        (req as any).user.accesTo = ['equipment', 'electronics', 'energy', 'resource', 'consumable'];
    }



    

	next();
};
