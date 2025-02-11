import { Request, Response } from 'express';
import { prisma } from '../routes/app-setup.js';
import {paikyHash, paikyCompare, paikyGetRandomSalt} from '../utils/crypto/salt-password.js';
import { paikyJWTsign } from '../utils/crypto/jwt.js';
import dotenv from 'dotenv'
import { BadRequestsException, ErrorCode } from '../exeptions/exceptions.js';
import { LoginSchemaType, SignupSchemaType } from '../validator-schemas/user-schemas.js';
import { TokenSchemaType } from '../validator-schemas/token-schema.js';
dotenv.config()


			//$ The reason why we include a next function here is not because this is a middleware . It is just so that we can trigger the error middleware that I defined.
export const signup = async (req: Request<{}, {}, SignupSchemaType>, res: Response) => {	
		const { name, email, password, role} = req.body ;

		let user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		const a = ''

		if (user) {
			//% If you don't understand what is going on here I would recommend you:
			//% 1. Know that this signup CONTROLLER is wrapped inside of "internalErrorHandler()" that is defined in "internal-exeption.ts".
			//% Visit auth-routes.ts file.
			//% I saved a Github version of how this was working before. "v1- In this version I am not using the internal error exception"
			throw new BadRequestsException('User already exists', ErrorCode.USER_ALREADY_EXISTS)
		}


        const salt = paikyGetRandomSalt()
        user = await prisma.user.create({
            data: {
                email,
                name,
                password: paikyHash(password, salt),
                salt,
				role
            }
        })
        res.send(paikyJWTsign({userId: user.id}, process.env.SECRET!))
};



export const login = async (req: Request<{}, {}, LoginSchemaType>, res: Response) => {
	
		const { email, password } = req.body;
        //! This should be middleware but I'll wait for the Indian guy to say it------------
		let user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		if (!user) throw new BadRequestsException('User not found', ErrorCode.USER_NOT_FOUND)
		
        const result = paikyCompare(  password, user.salt,  user.password)

        if (!result) throw new BadRequestsException('Invalid password', ErrorCode.INCORRECT_PASSWORD)

        res.send(paikyJWTsign({userId: user.id}, process.env.SECRET!))

       //!-----------------------------------------------------------------------------------

};

export const authtest = async (req: Request<{}, {}, TokenSchemaType>, res: Response) => {
	const user = (req as any).user;
	
	res.send(user)

};


