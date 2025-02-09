import { NextFunction, Request, Response } from 'express';
import { ErrorCode, HttpException } from '../exeptions/root-HttpException.js';
import { InternalException } from '../exeptions/internal-exeption.js';

//! I might need another function definition for an asynchronous type
type expressFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

//! I just realized that enforcing function types all over the place is not going to mean anything to typescript and typescript will allow you to pass functions with the incorrect arguments (like "login(req, res)" Which does not have a "next" argument)

//! At least it helps visually understand what it requires.

//prettier-ignore
export const internalErrorHandler = (func: expressFunction): expressFunction => {
	return async (req: Request, res: Response, next) => {
		try {
			await func(req, res, next); //$ Currently our controllers don't call "next". Because that is already being handled on line ¿28?
		} catch (e) {
            if(e !instanceof HttpException){
                e = new InternalException("Something went wrong: internal exception", ErrorCode.INTERNAL_EXCEPTION, e)
                next(e)
                console.log(e);
                res.status(400).send(e);
                return
            }
            console.log(e);
            res.status(400).send(e);
            next(e); //$ What express does when it noticed that you called next and you passed an error, is it will trigger the express error middleware defined at express-error-middleware.ts
        }
	};
};
