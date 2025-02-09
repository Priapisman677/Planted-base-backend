                    //! In this version I am not using this internal error exception          
                    //! In this version I am not using this internal error exception          
                    //! In this version I am not using this internal error exception          
                    //! In this version I am not using this internal error exception          


import { NextFunction, Request, Response } from 'express';

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
	return (req: Request, res: Response, next) => {
		try {
			func(req, res, next);
		} catch (e) {
            next(e)
        }
	};
};
