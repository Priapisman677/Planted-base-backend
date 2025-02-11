import { Router } from 'express';
import { authtest, login, signup } from '../controllers/users-controllers.js';
//prettier-ignore
import { LoginSchema, SignupSchema } from '../validator-schemas/user-schemas.js';
//prettier-ignore
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import { tokenSchema } from '../validator-schemas/token-schema.js';

const router = Router();

router.post('/signup', errorAndValidationHandler(signup, SignupSchema));

router.get('/login', errorAndValidationHandler(login, LoginSchema));

//prettier-ignore
router.get('/authtest',
     errorAndValidationHandler(authMiddleware, tokenSchema),
     errorAndValidationHandler(authtest));

export default router;
