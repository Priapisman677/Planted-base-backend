import { Router } from 'express';
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import {  findItemByName, findItemsPerTag, listAllItems, registerNewItem, updateItem } from '../controllers/items-cotroller.js';
import {findItemByNameSchema, itemSchema, updateItemSchema} from '../validator-schemas/item-schemas.js';
import { tokenSchema } from '../validator-schemas/token-schema.js';
import {overviewerAuthMiddleware, workerRoleAuthMiddleware} from '../middlewares/role-auth-middleware.js';


const router = Router()

router.post('claimlocker' , controller)