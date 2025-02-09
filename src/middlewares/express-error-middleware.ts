import { HttpException } from "../exeptions/root-HttpException.js";
import { NextFunction, Request, Response } from 'express';



        //$ In this middleware we pass the four arguments for express to note that it is an error middleware.
export const errorMiddleWare = (error: HttpException, _req: Request, res: Response, _next: NextFunction   ) =>{
    res.status(error.statusCode).json({
        error_message: error.message,
        errorCode: error.errorCode,
        //! Right now we're not doing anything with the error.error (Whatever got thrown from a catch block)
        error: error.error
    })
}