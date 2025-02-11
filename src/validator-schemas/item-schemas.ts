import {z} from 'zod'

export const itemSchema = z.object({
    body: z.object({
        name: z.string({required_error: 'Name is required'}).nonempty('Name cannot be empty'),
        description: z.string({required_error: 'Description is required'}).nonempty('Description cannot be empty'),
        // quantity: z.number({required_error: 'Quantity is required'}).nonnegative('Quantity should not be negative'),
        zone: z.string({required_error: 'Zone is required'}).nonempty('Zone cannot be empty'),
        weight: z.number({required_error: 'Weight is required'}).nonnegative('Quantity should not be negative'),
        tagId: z.number({required_error: 'tag Id is requiered'}).nonnegative('Quantity should not be negative')
    })
})

export type ItemSchemaType = z.infer<typeof itemSchema>['body']




export const findItemByNameSchema = z.object({
    body: z.object({
        name: z.string({required_error: 'Name is required'}).nonempty('Name cannot be empty'),
    })
})

export type FindItemByNameSchemaType = z.infer<typeof updateItemSchema>['body']




//! Will no longer be needed:
// export const itemToTagSchema = z.object({
//     body: z.object({
//         tagId: z.number({required_error: 'TagId is required'}),
//         itemId: z.number({required_error: 'ItemId is required'})
//     })
// })

// export type ItemToTagSchemaType = z.infer<typeof itemToTagSchema>['body']




export const updateItemSchema = z.object({
    body: z.object({
        name: z.string({required_error: 'Name is required'}).nonempty('Name cannot be empty'),
        quantity: z.number({required_error: 'Quantity is required'}).nonnegative('Quantity should not be negative'),
        action: z.enum(['store', 'take'], {required_error: 'Action name is required'})
    })
})

export type UpdateItemSchemaType = z.infer<typeof updateItemSchema>['body']