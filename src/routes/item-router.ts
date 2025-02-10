import { Router } from 'express';
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import {  findItemsPerTag, listAllItems, storeItem, tagItem, updateItem } from '../controllers/items-cotroller.js';
import {itemSchema, itemToTagSchema, updateItemSchema} from '../validator-schemas/item-schemas.js';


const router = Router()

router.post('/storeitem', errorAndValidationHandler(storeItem, itemSchema));

router.post('/tagitem', errorAndValidationHandler(tagItem, itemToTagSchema));

router.get('/listallitems', errorAndValidationHandler(listAllItems));

router.get('/finditemspertag', errorAndValidationHandler(findItemsPerTag));

router.get('/updateitem', errorAndValidationHandler(updateItem, updateItemSchema));






export default router