import { Request, Response } from 'express';
import { prisma } from '../routes/app-setup.js';
import comet from '../utils/crypto/index.js';
import dotenv from 'dotenv'
import { BadRequestsException, ErrorCode } from '../exeptions/exceptions.js';
import { LoginSchemaType, SignupSchemaType } from '../validator-schemas/user-schemas.js';
import { TokenSchemaType } from '../validator-schemas/token-schema.js';



const claimQuarter = (req: Request, res: Response)=>{

}


const unclaimQuarter = (req: Request, res: Response)=>{

}


const listQuarter = (req: Request, res: Response)=>{

}