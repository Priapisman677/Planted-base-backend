import { z } from 'zod';


export const SignupSchema = z.object({
	body: z.object({
		name: z.string({required_error: 'Name is required'}).nonempty('Name cannot be empty'),
		email: z.string({ required_error: "Email is required",  }).email('Email is not valid').nonempty('Email cannot be empty'), 
		password: z.string({required_error: 'Password is required'}).min(6, 'Password must be at least 6 characters').nonempty('Password cannot be empty'),
		role: z.enum(['ENGINEER', 'WORKER', 'MEDIC', 'VISITOR'], {required_error: 'Role is required'}),
	}),
})//! .strict();      If I were to enable a strict mode here it would say that all the other properties that come with your request are invalid.

export type SignupSchemaType = z.infer<typeof SignupSchema>['body']




export const LoginSchema = z.object({
	body: z.object({
		email:  z.string({required_error: 'Email is required'}).nonempty('Email cannot be empty'),
		password: z.string({required_error: 'Password is required'}).nonempty('Password cannot be empty')
	})
})

export type LoginSchemaType = z.infer<typeof LoginSchema>['body']


export const tokenSchema = z.object(
	//$ We are already checking for a missing token at the middleware but we do it twice just to make sure:
	{
		headers: z.object({
			authorization: z.string({required_error: 'Token is required'}).nonempty('Token cannot be empty'),
		}),
	}
)



export type TokenSchemaType = z.infer<typeof tokenSchema>