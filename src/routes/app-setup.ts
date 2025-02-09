import express from 'express';
import router from './user-routes.js';
import { PrismaClient } from '@prisma/client';
import { errorMiddleWare } from '../middlewares/express-error-middleware.js';

const app = express();
app.use(express.json());
app.use(router);

export const prisma = new PrismaClient({
	log: ['query'],
	// datasources: {
	//     db: {
	//         url:
	//     }
	// }
});


//$ Whenever a controller will throw an exception, this middleware will be called.
app.use(errorMiddleWare);
//$ As long as the function that we pass is a function with the "four parameters", Express will consider a valid error middleware.


//* I exported the app for testing vitest:
export default app;
