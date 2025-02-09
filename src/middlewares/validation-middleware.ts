

















//! Deprecated!!!!!!!




import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ErrorCode, UnprocessableEntity } from '../exeptions/root-HttpException.js';



export const schemaValidation = (schema: AnyZodObject) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		try {
			schema.parse(req);
			next();
		} catch (e) {
			if (e instanceof ZodError) {
                //prettier-ignore
				next(new UnprocessableEntity(
                    'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY, e.issues.map(issue => issue.message)
                ));
				return;
			}
		}
	};
};
