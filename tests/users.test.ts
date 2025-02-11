//prettier-ignore
import { describe, it, expect, vi, beforeEach, afterAll, test, beforeAll } from "vitest";
import request from 'supertest';
import app, { prisma } from '../src/routes/app-setup.ts';
import comet from '../src/utils/crypto/index.ts';

//! This test file should be independent of items tests. Meaning that the outcome of items tests should not interfere with this test file.

let user;

beforeAll(async () => {
	await prisma.user.deleteMany({
		where: {
			email: {
				in: ['Carlos@dwati.com', 'constructor@dwati.com'],
			},
		},
	});

	const salt = comet.cometGetRandomSalt();
	user = await prisma.user.create({
		data: {
			email: 'constructor@dwati.com',
			name: 'constructor',
			password: comet.cometHash('Carbon7', salt),
			salt: salt,
			role: 'OVERVIEWER',
		},
	});
});

describe('Login /', () => {
	test('Should Be able to log in', async () => {
		const result = await request(app)
			.get('/login')
			.send({
				email: 'constructor@dwati.com',
				password: 'Carbon7',
			}) // ✅ No need for JSON.stringify()
			.set('Content-Type', 'application/json')
			.expect(200);

		console.log(result.body);

		//% The token will always be different because the user id changes each test.
		expect(
			result.text.startsWith(
				'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOj'
			)
		).toBe(true);
	});

	test('Should receive an error if password is incorrect (login)', async () => {
		const result = await request(app)
			.get('/login')
			.send({
				email: 'constructor@dwati.com',
				password: 'aldkñaldk',
			}) // ✅ No need for JSON.stringify()
			.set('Content-Type', 'application/json')
			.expect(400);

		console.log(result.body);

		//% The token will always be different because the user id changes each test.
		expect(result.body).toEqual({
			error: null,
			errorCode: 1003,
			error_message: 'Invalid password',
		});
	});

	test('Should receive an error if body for /login is empty', async () => {
		const result = await request(app)
			.get('/login')
			.send({}) // ✅ No need for JSON.stringify()
			.set('Content-Type', 'application/json');

		expect(result.body).toEqual({
			error_message: 'Unprocessable entity',
			errorCode: 1004,
			error: ['Email is required', 'Password is required'],
		});
	});

	test('Should receive an error if credentials are empty', async () => {
		const result = await request(app)
			.get('/login')
			.send({ email: '', password: '' }) // ✅
			.set('Content-Type', 'application/json');

		expect(result.body).toEqual({
			error_message: 'Unprocessable entity',
			errorCode: 1004,
			error: ['Email cannot be empty', 'Password cannot be empty'],
		});
	});
});

describe('Signup /', () => {
	test('Should receive an error if trying to take existing user', async () => {
		//prettier-ignore
		const result = await request(app)
			.post('/signup')
			.send({email: 'constructor@dwati.com',password: 'Carbon7', name: 'Constructor', role: 'ENGINEER'})
			.set('Content-Type', 'application/json');

		expect(result.body).toEqual({
			error_message: 'User already exists',
			errorCode: 1002,
			error: null,
		});
	});

	test('Should be able to sign up successfully', async () => {
		//prettier-ignore
		const result = await request(app)
			.post('/signup')
			.send({email: 'Carlos@dwati.com',password: 'Carbon7',name: 'Constructor', role: "ENGINEER"})
			.set('Content-Type', 'application/json')
			.expect(200);

		//% The token will always be different because the user id changes each test.
		expect(
			result.text.startsWith(
				'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ'
			)
		).toBe(true);
	});

	test('Should trigger precise validation error', async () => {
		//prettier-ignore
		const result = await request(app)
			.post('/signup')
			.send({email: 'carlos@dwati.com',password: 'Carbo',name: 'Constructor',})
			.set('Content-Type', 'application/json');

		expect(result.body.error[0]).toBe(
			'Password must be at least 6 characters'
		);
	});
});
describe('Middleware /', () => {
	test('Authorization middleware should work', async () => {
		//% The token will always be different because the user id changes each test.
		const token = comet.cometJWTsign(
			{ userId: user.id },
			process.env.SECRET!
		);

		const result = await request(app)
			.get('/authtest')
			.send() // ✅ No need for JSON.stringify()
			.set('Authorization', `Bearer ${token}`)
			.expect(200);

		expect(result.body.email).toBe('constructor@dwati.com');
	});
	test('Authorization middleware should not work with tampered token', async () => {
		const result = await request(app)
			.get('/authtest')
			.send() // ✅ No need for JSON.stringify()
			.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOjF9.ZZOCTQh3VpIJMINmMpaGUm3BJOtbHYmIkbuZlA36ZZ'
			)
			.expect(401);

		expect(result.body.error_message).toBe('Unauthorized');
	});
	test('Authorization middleware should not work if token is missing', async () => {
		const result = await request(app)
			.get('/authtest')
			.send() // ✅ No need for JSON.stringify()
			.expect(422);

		expect(result.body.error_message).toBe('Unprocessable entity');
	});
});
