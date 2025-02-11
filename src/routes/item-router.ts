import { Router } from 'express';
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import {  findItemByName, findItemsPerTag, listAllItems, registerNewItem, updateItem } from '../controllers/items-cotroller.js';
import {findItemByNameSchema, itemSchema, updateItemSchema} from '../validator-schemas/item-schemas.js';
import { tokenSchema } from '../validator-schemas/token-schema.js';
import overviewerAuthMiddleware from '../middlewares/role-auth-middleware.js';


const router = Router()

//prettier-ignore
router.post('/registernewitem',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(overviewerAuthMiddleware),
    errorAndValidationHandler(registerNewItem, itemSchema));


//prettier-ignore
router.get('/listallitems',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(listAllItems));


//prettier-ignore
router.get('/finditembyname',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(findItemByName, findItemByNameSchema));


//prettier-ignore
router.get('/finditemspertag',
    errorAndValidationHandler(authMiddleware, tokenSchema),
errorAndValidationHandler(findItemsPerTag));


//prettier-ignore
router.get('/updateitem',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(updateItem, updateItemSchema));






export default router