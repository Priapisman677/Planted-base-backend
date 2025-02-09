import express from 'express';
import dotenv from 'dotenv';
import router from './auth-routes.js';
import { PrismaClient } from '@prisma/client';
import { errorMiddleWare } from '../middlewares/express-error-middleware.js';
dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());
app.use(router);

export const prisma = new PrismaClient({
	log: ['query'],

})

//$ Whenever a controller will throw an exception, this middleware will be called.
app.use(errorMiddleWare);
//$ As long as the function that we pass is a function with the "four parameters", Express will consider a valid error middleware.




app.get('/', (req, res) => {
    res.send('hello sir');
});



//* I exported the app for testing vitest:
export default app