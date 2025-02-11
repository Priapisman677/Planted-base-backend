import { Request, Response } from 'express';
import { prisma } from '../routes/app-setup.js';
//prettier-ignore
import { FindItemByNameSchemaType, ItemSchemaType, ItemToTagSchemaType, UpdateItemSchemaType } from '../validator-schemas/item-schemas.js';
//prettier-ignore
import { BadRequestsException, ErrorCode } from '../exeptions/exceptions.js';

//prettier-ignore
export const storeItem = async (req: Request<{}, {}, ItemSchemaType>, res: Response) => {
	const data = req.body;

	const item = await prisma.item.create({ data: 
        {...data,
            name: req.body.name.toLowerCase()
        },
     });

    res.send(item);
};

//prettier-ignore
export const tagItem = async (req: Request<{}, {}, ItemToTagSchemaType>, res: Response) => {
	const data = req.body;

	const itemToTag = await prisma.itemToTag.create({ 
        data: data
     });

    res.send(itemToTag);
};

//prettier-ignore
export const listAllItems = async (_req: Request, res: Response) =>{
    const items = await prisma.item.findMany({});
    res.send(items);
}

//prettier-ignore
export const findItemByName = async (req: Request<{}, {}, FindItemByNameSchemaType>,res: Response) => {
	const name = req.body.name;

	if (!name) {
		throw new BadRequestsException('Item name is required',ErrorCode.ITEM_NAME_REQUIRED);
	}

	const item = await prisma.item.findFirst({
		where: {
			name: name.toLocaleLowerCase(),
		},
	});

	if (!item) {
		throw new BadRequestsException('Item not found',ErrorCode.ITEM_NOT_FOUND);
	}

	res.send(item);
};

//prettier-ignore
export const findItemsPerTag = async (req: Request, res: Response) => {
	const name = req.body.tagName;
	if (!name) {
		throw new BadRequestsException('Tag name is required', ErrorCode.TAG_NAME_REQUIRED)
	}

	const itemsForTag = await prisma.item.findMany({
		where: {
			//$ Honestly I don't have much idea of how this logic work. I have not worked a lot with many to many relationships.
			ItemToTag: {
				some: {
					tag: {
						name, // Replace with your desired tag name
					},
				},
			},
		},
		include: { ItemToTag: { include: { tag: true } } },
	});

	res.send(itemsForTag);
};
//prettier-ignore
export const deleteItem = (_req: Request, _res: Response) =>{
    //$ Quantity should be specified in the request.
    //! This should not be used to decrease the quantity, preferably if the quantity reaches 0 their product should not be deleted.
    //! If the item does need to be deleted, call this route.

}

//prettier-ignore
export const updateItem = async (req: Request<{}, {}, UpdateItemSchemaType>, res: Response) => {
	const { name, quantity, action } = req.body;

    //$ Here we will check both if the item exists and we will know what is the current quantity.
    const item = await prisma.item.findUnique({
        where: {
            name: name.toLowerCase()
        }
    })

    if(!item){
        throw new BadRequestsException('Item not found', ErrorCode.ITEM_NOT_FOUND)
    }

    let modifyBy: number = 0
    let missing: number = 0
    const storedQuantity = item?.quantity

    if(action === 'store'){
        modifyBy = quantity
    }

    if(action === 'take'){
        if(quantity > storedQuantity){
            modifyBy = -storedQuantity
            missing = Math.abs(storedQuantity - quantity)
        }
        else{
            modifyBy = -quantity
        }
        
    }

    	// Prevent unnecessary updates
	if (modifyBy === 0) {
		return res.send({ warning: 'No change in quantity' });
	}

	const update = await prisma.item.updateManyAndReturn({
		where: {
			name: item.name.toLocaleLowerCase(),
		},
		data: {

            quantity: {
                increment: modifyBy
            }
		},
	});

    if(!missing){
        res.send(update)
    }else{
        res.send({warning:`Not enough quantity to take, you were given ${storedQuantity} becuse ${missing} are missing`,
        update})
    }
    
};
