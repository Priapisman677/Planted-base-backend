import { z } from 'zod';

export const SignupSchema = z.object({
	body: z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	}),
})//! .strict();      If I were to enable a strict mode here it would say that all the other properties that come with your request are invalid.

export type SignupSchemaType = z.infer<typeof SignupSchema>