//prettier-ignore
import { describe, it, expect, vi, beforeEach, afterAll, test, beforeAll } from "vitest";
import request from 'supertest';
import app, { prisma } from '../src/routes/app-setup.ts';
import { paikyGetRandomSalt, paikyHash } from "../src/utils/salt-password.ts";

//! This test file should be independent of items tests. Meaning that the outcome of items tests should not interfere with this test file.


beforeAll(async () => {
	const deleted = await prisma.user.deleteMany({
		where: {
			email: 'Carlos@asda.com',
		},
	});

	const salt = paikyGetRandomSalt()
	const password = paikyHash('SolarTechMaster', salt)
	

	const user = await prisma.user.create({
		data: {
			email: 'Carlos@asda.com',
			password: '',
			salt: 'pepper',
			name: 'Carlos',
			role: 'ENGINEER',
		},
	});
});


describe('Login /', () => {
    test('Should Be able to log in', async () => {
		const result = await request(app)
			.get('/login')
			.send({email: 'chzieSn.wei@space.com',password: 'SolarTechMaster'}) // ✅ No need for JSON.stringify()
			.set('Content-Type', 'application/json')
            .expect(200);

        console.log(result.body);
        
            
		expect(result.text).toEqual('eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOjMxfQ.Ad9oZRN5-ki1V0lhs3GY6FxJRp_0YNoK5I0hbyt0VkM');
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
			.send({email: 'chzieSn.wei@space.com',password: 'Carbon7', name: 'Constructor', role: 'ENGINEER'})
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
			.send({email: 'Carlos@asda.com',password: 'Carbon7',name: 'Constructor', role: "ENGINEER"})
			.set('Content-Type', 'application/json')
			.expect(200);

		expect(result.text.startsWith('eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ')).toBe(true);
	});

    test('Should trigger precise validation error', async () => {
		//prettier-ignore
		const result = await request(app)
			.post('/signup')
			.send({email: 'carlos@dwati.com',password: 'Carbo',name: 'Constructor',})
			.set('Content-Type', 'application/json');

		expect(result.body.error[0]).toBe('Password must be at least 6 characters');
	});

	
}); 
describe('Middleware /', () => {
		test('Authorization middleware should work', async () => {
			const result = await request(app)
				.get('/authtest')
				.send() // ✅ No need for JSON.stringify()
				.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOjMxfQ.Ad9oZRN5-ki1V0lhs3GY6FxJRp_0YNoK5I0hbyt0VkM')
				.expect(200);

			expect(result.body.email).toBe("chzieSn.wei@space.com");
		});
		test('Authorization middleware should not work with tampered token', async () => {
			const result = await request(app)
				.get('/authtest')
				.send() // ✅ No need for JSON.stringify()
				.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOjF9.ZZOCTQh3VpIJMINmMpaGUm3BJOtbHYmIkbuZlA36ZZ')
				.expect(401);

			expect(result.body.error_message).toBe("Unauthorized");
		});
		test('Authorization middleware should not work if token is missing', async () => {
			const result = await request(app)
				.get('/authtest')
				.send() // ✅ No need for JSON.stringify()
				.expect(422);

			expect(result.body.error_message).toBe("Unprocessable entity");
		});
})