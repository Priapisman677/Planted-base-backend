import { HttpException } from "../exeptions/exceptions.js";
import { NextFunction, Request, Response } from 'express';



//$ In this middleware we pass the four arguments for express to note that it is an error middleware.
export const errorMiddleWare = (error: HttpException, _req: Request, res: Response, _next: NextFunction   ) =>{
    console.log(error);
    
    res.status(error.statusCode).json({
        error_message: error.message,
        errorCode: error.errorCode,
        error: error.error
    })
}