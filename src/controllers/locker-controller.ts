import { Request, Response } from 'express';
import { prisma } from '../routes/app-setup.js';
import { BadRequestsException, ErrorCode } from '../exeptions/exceptions.js';
import {
	DeleteItemFromLockerSchemaType,
	StoreItemInLockerSchemaType,
} from '../validator-schemas/locker-schema.js';

//prettier-ignore
export const storeItemInLocker = async (req: Request<{}, {}, StoreItemInLockerSchemaType>,res: Response) => {
	const { itemName, quantity } = req.body;

	const item = await prisma.item.findUnique({
		where: {
			name: itemName.toLocaleLowerCase(),
		},
	});

	if (!item) {
		//prettier-ignore
		throw new BadRequestsException('Item not found',ErrorCode.ITEM_NOT_FOUND);
	}

	//* Checking if the item is already stored:
	const checkForStoredItem = await prisma.user_Stored_Item.findFirst({
		where: {
			userId: (req as any).user.id,
			itemId: item.id,
		},
	});

    let userStoredItem
    if (checkForStoredItem) {
        userStoredItem = await prisma.user_Stored_Item.updateMany({
            where: {
                itemId: checkForStoredItem.itemId,
            },
            data: {
                quantity: {
                    increment: quantity,
                },
            },
        });
        res.send('Item already in card, updated quantity by ' + quantity);
	    

    } else {
        userStoredItem = await prisma.user_Stored_Item.create({
            data: {
                userId: (req as any).user.id,
                itemId: item.id,
                quantity,
            },
        });
    	res.send(userStoredItem);
    }
};

//prettier-ignore
export const deleteItemFromLocker = async (req: Request<{}, {}, DeleteItemFromLockerSchemaType>,res: Response) => {

    const {itemName} = req.body

   const deletedItem = await prisma.user_Stored_Item.deleteMany({
       where: {
           item: {
               name: itemName.toLocaleLowerCase()
           }
       }
   })

   if(deletedItem.count === 0){
       //prettier-ignore
       throw new BadRequestsException('Item not found',ErrorCode.ITEM_NOT_FOUND);
   }



   res.send({message: `Deleted ${itemName}`});
};

export const seeStoredItems = async (req: Request<{}, {}>,res: Response) => {

    const id = (req as any).user.id

   const storedItems = await prisma.user_Stored_Item.findMany({
       where: {
           userId: id
       }
   })   

   if(storedItems.length === 0){
       //prettier-ignore
       throw new BadRequestsException('No items found',ErrorCode.ITEM_NOT_FOUND);
   }



   res.send({storedItems});
};
