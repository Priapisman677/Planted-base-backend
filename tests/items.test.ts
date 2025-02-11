//prettier-ignore
import { describe, it, expect, vi, beforeEach, afterAll, test, beforeAll } from "vitest";
import request from 'supertest';
import app, { prisma } from '../src/routes/app-setup.ts';
import comet from '../src/utils/crypto/index.ts';

//! This test file should be independent of user tests. Meaning that the outcome of user tests should not interfere with this test file.

let user;
let user2

beforeAll(async () => {
	await prisma.user.deleteMany({
		where: {
			email: {
				in: ['overviewer123@dwati.com', 'medic123@dwati.com'],
			},
		},
	});

	await prisma.item.deleteMany({
		where: {
			name: {
				in: ['coffee', 'chocolate'],
			},
		},
	})
	const item = await prisma.item.create({
		data: {
			name: 'chocolate',
			description: 'Semi-sweet chocolate.',
			zone: 'Storage A',
			weight: 0.5,
			quantity: 10,
		},
	})

	await prisma.itemToTag.create({
		data: {
			itemId: item.id,
			tagId: 3
		}
	})

	const salt = comet.cometGetRandomSalt();
	user = await prisma.user.create({
		data: {
			email: 'overviewer123@dwati.com',
			name: 'overviewer123',
			password: comet.cometHash('Carbon7', salt),
			salt: salt,
			role: 'OVERVIEWER',
		},
	});

	user2 = await prisma.user.create({
		data: {
			email: 'medic123@dwati.com',
			name: 'medic123',
			password: comet.cometHash('Carbon7', salt),
			salt: salt,
			role: 'MEDIC',
		},
	});
});

describe('Role base authentication /', () => {
	test('Should Be able to register new item as overviewer ', async () => {
		const token = comet.cometJWTsign(
			{ userId: user.id },
			process.env.SECRET!
		);

		const result = await request(app)
			.post('/registernewitem')
			.send({
				name: 'Coffee',
				description: 'Dry instant coffee. Miners love this',
				zone: 'Storage A',
				weight: 0.5,
				tagId: 2,
			})
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.expect(200);


		expect(result.body.name).toEqual('coffee');
	});

	test('Should throw an error if trying to register an item that already exists ', async () => {
		const token = comet.cometJWTsign(
			{ userId: user.id },
			process.env.SECRET!
		);

		const result = await request(app)
			.post('/registernewitem')
			.send({
				name: 'Coffee',
				description: 'Dry instant coffee. Miners love this',
				zone: 'Storage A',
				weight: 0.5,
				tagId: 2,
			})
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.expect(400);

		expect(result.body).toEqual({
			"error": null,
			"errorCode": 1011,
			"error_message": "Item name exists, you should update the quantity instead",
		  });
	});

	test('Should find the correct item if you have the correct role.', async () => {
		const token = comet.cometJWTsign(
			{ userId: user2.id },
			process.env.SECRET!
		);

		const result = await request(app)
			.get('/finditembyname')
			.send({
				name: 'Coffee',
			})
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		expect(result.body[0].name).toEqual('coffee');
	});
	test('Should not find an item if you do not have the correct role.', async () => {
		const token = comet.cometJWTsign(
			{ userId: user2.id },
			process.env.SECRET!
		);

		const result = await request(app)
			.get('/finditembyname')
			.send({
				name: 'chocolate',
			})
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${token}`)
			.expect(400);

		expect(result.body).toEqual({
			error: null,
			errorCode: 1009,
			error_message: "Item not found",
		  });
	});
});
