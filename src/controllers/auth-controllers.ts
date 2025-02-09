import { NextFunction, Request, Response } from 'express';
import { prisma } from '../routes/index.js';
import {paikyHash, paikyCompare, paikyGetRandomSalt} from '../utils/salt-password.js';
import { paikyJWTsign } from '../utils/jwt.js';
import dotenv from 'dotenv'
import { BadRequestsException } from '../exeptions/bad-request.js';
import { ErrorCode } from '../exeptions/root-HttpException.js';
import { SignupSchemaType } from '../schemas/user-val-schema.js';
dotenv.config()


			//$ The reason why we include a next function here is not because this is a middleware . It is just so that we can trigger the error middleware that I defined.
export const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, password} = (req as SignupSchemaType).body ;

		let user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		if (user) {
			next( new BadRequestsException('User already exists', ErrorCode.USER_ALREADY_EXISTS))
			//$ When we wrap an error object inside of next, express will not direct this to the "natural" middleware that would follow:  instead it will direct it to the next 🔥ERROR MIDDLEWARE🔥.
			return
		}

        const salt = paikyGetRandomSalt()
        user = await prisma.user.create({
            data: {
                email,
                name,
                password: paikyHash(password, salt),
                salt
            }
        })
        res.send(user)
	} catch (error) {

		
		console.log(error);
		res.status(400).send(error);
	}

};
export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
        //! This should be middleware but I'll wait for the Indian guy to say it------------
		let user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		if (!user) {
			next(new BadRequestsException('User not found', ErrorCode.USER_NOT_FOUND))
			return
		}
        const result = paikyCompare(  password, user.salt,  user.password)
        if (!result) return next(new BadRequestsException('Invalid password', ErrorCode.INCORRECT_PASSWORD))

        res.send(paikyJWTsign({userId: user.id}, process.env.SECRET!))

       //!-----------------------------------------------------------------------------------

	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
};


