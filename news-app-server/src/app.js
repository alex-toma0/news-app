"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const server = (0, fastify_1.default)();
server.get('/test', async (request, response) => {
    return 'test';
});
server.register(user_route_1.default, { prefix: "api/users" });
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`Server running at ${address}`);
});
