//prettier-ignore
import { describe, it, expect, vi, beforeEach, afterAll, test, beforeAll } from "vitest";
import request from 'supertest';
import app, { prisma } from '../src/routes/app-setup.ts';

//! This test file should be independent of user tests. Meaning that the outcome of user tests should not interfere with this test file.

beforeAll(async () => {
	const deleted = await prisma.user.deleteMany({
		where: {
			email: 'Carlos@asda.com',
		},
	});

	


});

describe('registernewitem /', () => {
	test('Should Be able to register new item as overviewer ', async () => {
		// const result = await request(app)
		// 	.get('/registernewitem')
		// 	.send({
		// 		email: 'chzieSn.wei@space.com',
		// 		password: 'SolarTechMaster',
		// 	}) // ✅ No need for JSON.stringify()
		// 	.set('Content-Type', 'application/json')
		// 	.expect(200);

		// console.log(result.body);

		// expect(result.text).toEqual(
		// 	'eyJhbGciOiJIUzI1NiIsInR5cGUiOiJqd3QifQ.eyJ1c2VySWQiOjMxfQ.Ad9oZRN5-ki1V0lhs3GY6FxJRp_0YNoK5I0hbyt0VkM'
		// );
	});
});
