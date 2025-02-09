

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
    INTERNAL_EXCEPTION = 1005
}