import { Router } from 'express';
import { authtest, login, signup } from '../controllers/auth-controllers.js';
import { LoginSchema, SignupSchema, tokenSchema } from '../validator-schemas/user-schemas.js';
import { errorAndValidationHandler } from '../utils/errorAndValidationHandler.js';
import authMiddleware from '../middlewares/auth-middleware.js';


const router = Router()

router.post('/signup', errorAndValidationHandler(signup, SignupSchema));

router.get('/login', errorAndValidationHandler(login, LoginSchema));

router.get('/authtest',
     errorAndValidationHandler(authMiddleware, tokenSchema), 
     errorAndValidationHandler(authtest));


export default router