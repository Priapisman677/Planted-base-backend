import { Router } from 'express';
import { login, signup } from '../controllers/auth-controllers.js';
import { LoginSchema, SignupSchema } from '../schemas/user-val-schema.js';
import { internalErrorHandler } from '../utils/internal-error-handler.js';


const router = Router()
//! Next step should be to merge these two:
router.post('/signup', internalErrorHandler(signup, SignupSchema));
router.get('/login', internalErrorHandler(login, LoginSchema));


export default router