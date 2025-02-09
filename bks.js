import { NextFunction, Request, Response } from 'express';
import { ErrorCode, HttpException } from '../exeptions/root-HttpException.js';
import { InternalException } from '../exeptions/internal-exeption.js';
import { N } from 'vitest/dist/chunks/environment.d8YfPkTm.js';

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
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await func(req, res, next); //$ Currently our controllers don't call "next". Because that is already being handled on line ¿28?
            debugger
		} catch (e) {
            let exception 
            if(e instanceof HttpException){
                exception = e
            }else{
                exception = new InternalException("Something went wrong: internal exception", ErrorCode.INTERNAL_EXCEPTION, e)
            }
            // console.log(exception);
            next(exception); //$ What express does when it noticed that you call next() and you passed an error object is: it will trigger the express error middleware defined at express-error-middleware.ts And that middleware will have access to the error object.
        }
	};
};
