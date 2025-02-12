import {z} from 'zod'

export const claimquarterSchema = z.object({
    body: z.object({
        lockerCapacity: z.number({required_error: 'Locker capacity is required'})
        .nonnegative('Locker capacity should not be negative')
        .min(1, 'Locker capacity should be at least 1')
        .max(30, 'Locker capacity should be at most 30'),
        zone: z.string({required_error: 'Zone is required'}).nonempty('Zone cannot be empty')
    })
})

export type claimQuarterSchemaType = z.infer<typeof claimquarterSchema>['body']



export const deletequarterSchema = z.object({
    body: z.object({
        quarterId: z.number({required_error: 'quarterId is required'})
        .nonnegative('quarterId should not be negative'),
    })
})

export type deleteQuarterSchemaType = z.infer<typeof deletequarterSchema>['body']


export const favoriteQuarterSchema = z.object({
    body: z.object({
        quarterId: z.number({required_error: 'quarterId is required'})
        .nonnegative('quarterId should not be negative'),
    })
})

export type FavoriteQuarterSchemaType = z.infer<typeof favoriteQuarterSchema>['body']


