

//$ Once I wrapp this error object instance on a next function I will have access to it in the Error middleware.
export class HttpException extends Error {
	constructor(
        public message: string,  // ✅ Defined in `HttpException`, also used by `Error`
        public errorCode: ErrorCode,   // ❌ Not part of `Error`, unique to `HttpException`
        public statusCode: number, // ❌ Not part of `Error`, unique to `HttpException`
        public error: any        // ❌ Not part of `Error`, unique to `HttpException`
	) {
		super(message); // ✅ Passes `message` to the parent `Error` class
	}
}


export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 1004,
    INTERNAL_EXCEPTION = 1005,
    UNAUTHORIZED = 1006,
    TAG_NAME_REQUIRED =  1007,
    ITEM_NAME_REQUIRED =  1008,
    ITEM_NOT_FOUND =  1009,
    UNAUTHORIZED_ROLE = 1010,
    ITEM_ALREADY_EXISTS = 1011,
    QUARTER_NOT_FOUND = 1012,
}

//* Exceptions:

export class UnprocessableEntity  extends HttpException {
    constructor( message: string, errorCode: ErrorCode, error: any){
        super(message, errorCode, 422, error)
    }
}

export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCode){
        super(message, errorCode, 400, null)
    }
}

export class InternalException  extends HttpException {
    constructor( message: string, errorCode: ErrorCode, error: any){
        super(message, errorCode, 500, error)
    }
}

export class UnauthorizedException  extends HttpException {
    constructor(message: string, errorCode: ErrorCode){
        super(message, errorCode,  401, null)
    }
}

export class UnauthorizedRole extends HttpException {

    constructor(message: string, errorCode: ErrorCode){
        super(message, errorCode, 401, null )
    }
}