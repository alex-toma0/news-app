"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email(),
    name: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
    password: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }),
});
