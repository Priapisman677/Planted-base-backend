import { Router } from 'express';
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import { tokenSchema } from '../validator-schemas/token-schema.js';
import { deleteItemFromLocker, seeStoredItems, storeItemInLocker } from '../controllers/locker-controller.js';
import { deleteItemFromLockerSchema, storeItemInLockerSchema } from '../validator-schemas/locker-schema.js';


const router = Router()




//prettier-ignore
router.post('/storeiteminlocker',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(storeItemInLocker, storeItemInLockerSchema ));

router.delete('/deleteitemfromlocker',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(deleteItemFromLocker, deleteItemFromLockerSchema ));
    
router.get('/seestoreditems',
    errorAndValidationHandler(authMiddleware, tokenSchema),
    errorAndValidationHandler(seeStoredItems));

    export default router