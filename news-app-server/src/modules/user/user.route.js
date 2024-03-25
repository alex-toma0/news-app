"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("./user.controller"));
const user_schema_1 = require("./user.schema");
const userRoutes = async (server) => {
    server.post("/", {
        schema: {
            body: (0, user_schema_1.$ref)("createUserSchema"),
            response: {
                201: (0, user_schema_1.$ref)("createUserResponseSchema"),
            },
        },
    }, user_controller_1.default);
};
exports.default = userRoutes;
