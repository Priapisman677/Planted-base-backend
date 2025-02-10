import { Request, Response } from 'express';
import { prisma } from '../routes/app-setup.js';
//prettier-ignore
import { ItemSchemaType, ItemToTagSchemaType, UpdateItemSchemaType } from '../validator-schemas/item-schemas.js';
//prettier-ignore
import { BadRequestsException, ErrorCode } from '../exeptions/root-HttpException.js';

//prettier-ignore
export const storeItem = async (req: Request<{}, {}, ItemSchemaType>, res: Response) => {
	const data = req.body;

	const item = await prisma.item.create({ data: 
        data,
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
export const findItemsPerTag = async (req: Request, res: Response) =>{

    const name = req.body.tagName
    if(!name){
        throw new BadRequestsException('Tag name is required', ErrorCode.TAG_NAME_REQUIRED)
    }   
    const itemsForTag = await prisma.item.findMany({
        where: {
            //$ Honestly I don't have much idea of how this logic work. I have not worked a lot with many to many relationships.
          ItemToTag: {
            some: {
              tag: {
                name // Replace with your desired tag name
              }
            }
          }
        },
        include: { ItemToTag: { include: { tag: true } } }
      });
      
      res.send(itemsForTag);
}
//prettier-ignore
export const deleteItem = (req: Request, res: Response) =>{
    //$ Quantity should be specified in the request.
    //! This should not be used to decrease the quantity, preferably if the quantity reaches 0 their product should not be deleted.
    //! If the item does need to be deleted, call this route.

}

//prettier-ignore
export const updateItem = async (req: Request<{}, {}, UpdateItemSchemaType>, res: Response) => {
	const { name, quantity, action } = req.body;
	//$ Quantity should be specified in the request.
	const update = await prisma.item.update({
		where: {
			name,
		},
		data: {
			quantity:
				action === 'inc'
					? { increment: quantity }
					: { increment: quantity },
		},
	});
    res.send(update)
};
