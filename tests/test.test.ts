import { describe, it, expect, vi, beforeEach, afterAll, test } from "vitest";
import request  from 'supertest'
import app from '../src/routes/app-setup.ts'


//! I need to allow the startup to be able to test out of the box.

describe('Login /', () => {
    test('Should receive an error if body for /login is empty', async () => {
        const result = await request(app)
            .get('/login')
            .send({}) // ✅ No need for JSON.stringify()
            .set('Content-Type', 'application/json');

        expect(result.body).toEqual({ // ✅ Use .body instead of .text
            error_message: "Unprocessable entity",
            errorCode: 1004,
            error: ["Email is required", "Password is required"]
        });
    });

    test('Should receive an error if credentials are empty', async () => {
        const result = await request(app)
            .get('/login')
            .send({ email: "", password: "", name: "" }) // ✅ No JSON.stringify()
            .set('Content-Type', 'application/json');

        expect(result.body).toEqual({ // ✅ Use .body for JSON comparison
            error_message: "Unprocessable entity",
            errorCode: 1004,
            error: ["Email cannot be empty", "Password cannot be empty"]
        });
    });

    test('Should receive an error if credentials are empty', async () => {
        const result = await request(app)
            .get('/login')
            .send({ email: "", password: "", name: "" }) // ✅ No JSON.stringify()
            .set('Content-Type', 'application/json');

        expect(result.body).toEqual({ // ✅ Use .body for JSON comparison
            error_message: "Unprocessable entity",
            errorCode: 1004,
            error: ["Email cannot be empty", "Password cannot be empty"]
        });
    });
});



// {"email":"lilyy@liiily9ooj2a.com", "password":"kkjh99"}
