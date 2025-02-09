import { NextFunction, Request, Response } from 'express';
import {
	ErrorCode,
	HttpException,
	InternalException,
	UnprocessableEntity,
} from '../exeptions/root-HttpException.js';
import { AnyZodObject, ZodError } from 'zod';

type expressFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

//! I just realized that enforcing function types all over the place is not going to mean anything to typescript and typescript will allow you to pass functions with the incorrect arguments (like "login(req, res)" Which does not have a "next" argument)

//! At least it helps visually understand what it requires.

export const internalErrorHandler = (func: expressFunction, schema: AnyZodObject): expressFunction => {

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
            schema.parse(req) //$ Running Zod validation here.
			await func(req, res, next); //$ Currently our controllers don't call "next". Because that is already being handled on line ¿41?
		} catch (e) {
            let exception 
            if(e instanceof HttpException){
                exception = e
            }else if(e instanceof ZodError){
                exception = new UnprocessableEntity(
                    'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY, e.issues.map(issue => issue.message)
                )
            }
            else{
                exception = new InternalException(
                    "Something went wrong: internal exception", ErrorCode.INTERNAL_EXCEPTION, e
                )
            }
            // console.log(exception);
            next(exception); //$ What express does when it noticed that you call next() and you passed an error object is: it will trigger the express error middleware defined at express-error-middleware.ts And that middleware will have access to the error object.
        }
	};
};
