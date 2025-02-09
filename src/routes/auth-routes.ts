import { Router } from 'express';
import { login, signup } from '../controllers/auth-controllers.js';
import { schemaValidation } from '../middlewares/validation-middleware.js';
import { SignupSchema } from '../schemas/user-val-schema.js';
import { internalErrorHandler } from '../utils/internal-error-handler.js';


const router = Router()
router.post('/signup', schemaValidation(SignupSchema), internalErrorHandler(signup));
router.get('/login', internalErrorHandler(login));


export default router