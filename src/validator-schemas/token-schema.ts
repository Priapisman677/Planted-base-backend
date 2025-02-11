import { z } from 'zod';


export const tokenSchema = z.object(
    //$ We are already checking for a missing token at the middleware but we do it twice just to make sure:
    {
        headers: z.object({
            authorization: z.string({required_error: 'Token is required'}).nonempty('Token cannot be empty'),
        }),
    }
)



export type TokenSchemaType = z.infer<typeof tokenSchema>