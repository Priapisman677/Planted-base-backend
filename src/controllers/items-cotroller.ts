import { Request, Response } from 'express';
import { prisma } from '../routes/app-setup.js';
//prettier-ignore
import { FindItemByNameSchemaType, ItemSchemaType, UpdateItemSchemaType } from '../validator-schemas/item-schemas.js';
//prettier-ignore
import { BadRequestsException, ErrorCode } from '../exeptions/exceptions.js';
import { User } from '../middlewares/role-auth-middleware.js';

//prettier-ignore
export const registerNewItem = async (req: Request<{}, {}, ItemSchemaType>, res: Response) => {
	
	const {description, weight, zone, name, tagId} = req.body;

	const checkForStoredItem = await prisma.item.findFirst({
		where: {
			name: name.toLowerCase()
		}
	})

	if(checkForStoredItem){
		throw new BadRequestsException('Item name exists, you should update the quantity instead', ErrorCode.ITEM_ALREADY_EXISTS)
	}

	const item = await prisma.item.create({ data: 
        {
			description, 
			weight,
			zone,
			name: name.toLowerCase()
        },
     });

	 await prisma.itemToTag.create({
		data: {
			itemId: item.id,
			tagId: tagId
		}
	 })

    res.send(item);
};

//prettier-ignore
export const listAllItems = async (req: Request, res: Response) =>{

	const user: User  = (req as any).user;

	const tagAcces = user.accesTo

    const items = await prisma.item.findMany({
		where: {
			ItemToTag: {
				
				every: { //$ Honestly I've not worked a lot with every and some (or many-to-many). Be careful.
					tag: {
						name: {
							in: tagAcces
						}
					}
				}
			}
		},
		include: {
			ItemToTag: {
				select: {
					tag: {
						select: {
							name: true
						}
					}
				}
			}
		}
	});
    res.send(items);
}

//prettier-ignore
export const findItemByName = async (req: Request<{}, {}, FindItemByNameSchemaType>,res: Response) => {

	const user: User = (req as any).user;

	const tagAcces = user.accesTo

	const name = req.body.name;

	if (!name) {
		throw new BadRequestsException('Item name is required',ErrorCode.ITEM_NAME_REQUIRED);
	}

	const item = await prisma.item.findMany({
		where: {
			name: name.toLocaleLowerCase(),
			ItemToTag: {
				
				every: { //$ Honestly I've not worked a lot with every and some (or many-to-many). Be careful.
					tag: {//$ This logic filters role-wise
						name: {
							in: tagAcces
						}
					}
				}
			}
		},
		
	});

	if (item.length	=== 0) {
		throw new BadRequestsException('Item not found', ErrorCode.ITEM_NOT_FOUND);
	}

	res.send(item);
};

//prettier-ignore
export const findItemsPerTag = async (req: Request, res: Response) => {
	const user: User = (req as any).user;

	const tagAcces = user.accesTo

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
						name: name.toLocaleLowerCase(), // Replace with your desired tag name
					},
				},

				every: {
					tag: {
						name: {
							in: tagAcces
						}
					}
				}
			},
		},
		include: { ItemToTag: { include: { tag: true } } },
	});

	if (itemsForTag.length === 0) {
		throw new BadRequestsException('Item not found', ErrorCode.ITEM_NOT_FOUND);
	}

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

	const user: User = (req as any).user;

	const tagAcces = user.accesTo

    //$ Here we will check both if the item exists and we will know what is the current quantity.
    const item = await prisma.item.findUnique({
        where: {
            name: name.toLowerCase(),
			ItemToTag: {
				some: { 
					tag: {
						name: {
							in: tagAcces
						}
					}
				}
			}
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
