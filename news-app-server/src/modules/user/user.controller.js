"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const registerUserHandler = async (request, reply) => {
    const body = request.body;
    try {
        const user = await (0, user_service_1.default)(body);
        return reply.code(201).send(user);
    }
    catch (err) {
        console.log(err);
        return reply.code(500).send(err);
    }
};
exports.default = registerUserHandler;
