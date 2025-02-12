import { Router } from 'express';
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';
//prettier-ignore
import { claimQuarter, favoriteQuarter, listQuarter, unclaimQuarter } from '../controllers/quarter-controller.js';
import { tokenSchema } from '../validator-schemas/token-schema.js';
//prettier-ignore
import { claimquarterSchema, deletequarterSchema, favoriteQuarterSchema} from '../validator-schemas/quarter-schema.js';

const router = Router();

//prettier-ignore
router.post('/claimquarter',
    errorAndValidationHandler(authMiddleware, tokenSchema), 
    errorAndValidationHandler(claimQuarter, claimquarterSchema))

//prettier-ignore
router.delete('/unclaimquarter', 
    errorAndValidationHandler(authMiddleware, tokenSchema), 
    errorAndValidationHandler(unclaimQuarter, deletequarterSchema))

//prettier-ignore
router.get('/listquarters', 
    errorAndValidationHandler(authMiddleware, tokenSchema), 
    errorAndValidationHandler(listQuarter))

router.put('/favoriteQuarter', 
    errorAndValidationHandler(authMiddleware, tokenSchema), 
    errorAndValidationHandler(favoriteQuarter, favoriteQuarterSchema))


export default router;
