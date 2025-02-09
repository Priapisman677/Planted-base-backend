
                    //! In this version I am not using the internal error exception          
                    //! In this version I am not using the internal error exception          
                    //! In this version I am not using the internal error exception          
                    //! In this version I am not using the internal error exception          
                    //! In this version I am not using the internal error exception          
                    //! In this version I am not using the internal error exception          
                    //! In this version I am not using the internal error exception          


import { Router } from 'express';
import { login, signup } from '../controllers/auth-controllers.js';
import { schemaValidation } from '../middlewares/validation-middleware.js';
import { SignupSchema } from '../schemas/user-val-schema.js';
import { internalErrorHandler } from '../utils/internal-error-handler.js';


const router = Router()
                    //! In this version I am not using the internal error exception          
router.post('/signup', schemaValidation(SignupSchema), signup);
router.get('/login', login);


export default router