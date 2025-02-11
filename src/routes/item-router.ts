import { Router } from 'express';
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import {  findItemByName, findItemsPerTag, listAllItems, registerNewItem, updateItem } from '../controllers/items-cotroller.js';
import {findItemByNameSchema, itemSchema, updateItemSchema} from '../validator-schemas/item-schemas.js';
import { tokenSchema } from '../validator-schemas/token-schema.js';
import {overviewerAuthMiddleware, workerRoleAuthMiddleware} from '../middlewares/role-auth-middleware.js';


const router = Router()


//% Remember that to perform certain actions of specifically tagged items you need to be logged in as a specific role. You can log in as overviewer to have access to everything.

//prettier-ignore
router.post('/registernewitem',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(overviewerAuthMiddleware),
    errorAndValidationHandler(registerNewItem, itemSchema));


//prettier-ignore
router.get('/listallitems',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(workerRoleAuthMiddleware),
    errorAndValidationHandler(listAllItems));


//prettier-ignore
router.get('/finditembyname',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(workerRoleAuthMiddleware),
    errorAndValidationHandler(findItemByName, findItemByNameSchema))


//prettier-ignore
router.get('/finditemspertag',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(workerRoleAuthMiddleware),
    errorAndValidationHandler(findItemsPerTag));


//prettier-ignore
router.get('/updateitem',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(workerRoleAuthMiddleware),
    errorAndValidationHandler(updateItem, updateItemSchema));






export default router