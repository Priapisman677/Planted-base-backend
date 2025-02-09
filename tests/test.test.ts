import {testThis} from "../src/index.js";
import { describe, it, expect, vi, beforeEach, afterAll, test } from "vitest";

test('testThis', () => {

    const result = testThis(process.env.MIGUEL!);
    expect(result).toBe('MIGUEL');
});
