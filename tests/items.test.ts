//prettier-ignore
import { describe, it, expect, vi, beforeEach, afterAll, test, beforeAll } from "vitest";
import request from 'supertest';
import app, { prisma } from '../src/routes/app-setup.ts';
import comet from '../src/utils/crypto/index.ts';

//! This test file should be independent of user tests. Meaning that the outcome of user tests should not interfere with this test file.

let user;

beforeAll(async () => {
	await prisma.user.deleteMany({
		where: {
			email: 'overviewer123@dwati.com',
		},
	});

	await prisma.item.deleteMany({
		where: {
			name: 'coffee',
		},
	})

	const salt = comet.cometGetRandomSalt();
	user = await prisma.user.create({
		data: {
			email: 'overviewer123@dwati.com',
			name: 'overviewer123',
			password: comet.cometHash('minecraft67', salt),
			salt: salt,
			role: 'OVERVIEWER',
		},
	});
});

describe('registernewitem /', () => {
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

		console.log(result.body);

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

		console.log(result.body);

		expect(result.body).toEqual({
			"error": null,
			"errorCode": 1011,
			"error_message": "Item name exists, you should update the quantity instead",
		  });
	});
});
