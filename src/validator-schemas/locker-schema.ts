import {z} from 'zod'

export const storeItemInLockerSchema = z.object({
    body: z.object({
        itemName: z.string({required_error: 'Name is required'}).nonempty('Name cannot be empty'),
        quantity: z.number({required_error: 'Quantity is required'}).nonnegative('Quantity should not be negative')
    })
})

export type StoreItemInLockerSchemaType = z.infer<typeof storeItemInLockerSchema>['body']


export const deleteItemFromLockerSchema = z.object({
    body: z.object({
        itemName: z.string({required_error: 'Name is required'}).nonempty('Name cannot be empty'),
        // quantity: z.number({required_error: 'Quantity is required'}).nonnegative('Quantity should not be negative')
    })
})

export type DeleteItemFromLockerSchemaType = z.infer<typeof deleteItemFromLockerSchema>['body']
