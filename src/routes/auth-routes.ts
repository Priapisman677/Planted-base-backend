import { Router } from 'express';
import { login, signup } from '../controllers/auth-controllers.js';
import { schemaValidation } from '../middlewares/validation-middleware.js';
import { LoginSchema, SignupSchema } from '../schemas/user-val-schema.js';
import { internalErrorHandler } from '../utils/internal-error-handler.js';


const router = Router()
//! Next step should be to merge these two:
//                            ⬇️                                ⬇️
router.post('/signup', schemaValidation(SignupSchema), internalErrorHandler(signup));
router.get('/login', schemaValidation(LoginSchema), internalErrorHandler(login));


export default router