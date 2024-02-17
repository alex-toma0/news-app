"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../utils/prisma"));
const hash_1 = require("../../utils/hash");
const createUser = async (input) => {
    const hashedPassword = await (0, hash_1.hashPassword)(input.password);
    const user = await prisma_1.default.user.create({
        data: {
            email: input.email,
            name: input.name,
            password: hashedPassword,
        },
    });
    return user;
};
exports.default = createUser;
