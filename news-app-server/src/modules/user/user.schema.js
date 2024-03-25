"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const userCore = {
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
};
const createUserSchema = zod_1.z.object(Object.assign(Object.assign({}, userCore), { password: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }) }));
const createUserResponseSchema = zod_1.z.object(Object.assign(Object.assign({}, userCore), { id: zod_1.z.number() }));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createUserSchema,
    createUserResponseSchema,
}, { $id: "Test" }), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
