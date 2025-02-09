



import { ErrorCode, HttpException } from "./root-HttpException.js";

export class UnprocessableEntity  extends HttpException {
    constructor( message: string, errorCode: ErrorCode, error: any){
        super(message, errorCode, 500, error)
    }
}