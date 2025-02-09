import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { UnprocessableEntity } from '../exeptions/UnprocessableEntity.js';
import { ErrorCode } from '../exeptions/root-HttpException.js';

//! I am not sure if this ⬇️ should be async but I do it because inside of the next function I emit an error. I need to test it with and without  ⬇️   async.
export const schemaValidation = (schema: AnyZodObject) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		try {
			console.log(req.body);

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
			res.status(500).send('Unknown Error :(');
			return;
		}
	};
};
