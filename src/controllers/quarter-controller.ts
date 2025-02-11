import { Request, Response } from 'express';
import { prisma } from '../routes/app-setup.js';
import { BadRequestsException, ErrorCode } from '../exeptions/exceptions.js';
import {
	claimQuarterSchemaType,
	deleteQuarterSchemaType,
} from '../validator-schemas/quarter-schema.js';

export const claimQuarter = async (
	req: Request<{}, {}, claimQuarterSchemaType>,
	res: Response
) => {
	const user = (req as any).user;
	const userId = user.id;
	const { lockerCapacity, zone } = req.body;

	const quarter = await prisma.personal_Quarter.create({
		data: {
			lockerCapacity,
			zone,
			userId,
		},
	});

	res.send({ quarter });
};

export const unclaimQuarter = async (
	req: Request<{}, {}, deleteQuarterSchemaType>,
	res: Response
) => {
	const user = (req as any).user;
	const userId = user.id;

	const unclaimedQuarter = await prisma.personal_Quarter.deleteMany({
		where: {
			id: req.body.quarterId,
			userId,
		},
	});

	if (unclaimedQuarter.count === 0) {
		//prettier-ignore
		throw new BadRequestsException('Quarter not found',ErrorCode.QUARTER_NOT_FOUND);
	}

	res.send(unclaimedQuarter);
};

export const listQuarter = async (req: Request, res: Response) => {
	const user = (req as any).user;
	const userId = user.id;

	let quarters;
	if (user.role === 'OVERVIEWER') {
		quarters = await prisma.personal_Quarter.findMany({});
	} else {
		quarters = await prisma.personal_Quarter.findMany({
			where: {
				userId,
			},
		});
	}
    if(quarters.length === 0){
        //prettier-ignore
        throw new BadRequestsException('No quarters found',ErrorCode.QUARTER_NOT_FOUND);
    }

	res.send(quarters);
};
